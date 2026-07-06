const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const axios = require('axios');

// @desc    Get nearby hospitals based on lat and lng
// @route   GET /api/hospitals/nearby
// @access  Public
exports.getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng, distance = 100000 } = req.query; // Default 100km

    if (!lat || !lng) {
      // If no location provided, just return all hospitals
      const hospitals = await Hospital.find({ isActive: true });
      return res.json({
        hospitals: hospitals.map(h => ({
          id: h._id,
          name: h.name,
          address: h.address,
          phone: h.phone,
          departments: h.departments,
          timings: h.timings,
          rating: h.rating,
          image: h.image,
          latitude: h.latitude,
          longitude: h.longitude,
          distance: null
        }))
      });
    }

    // Convert string to float
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const maxDistanceInMeters = parseInt(distance);

    // LIVE DATA INTEGRATION: Fetch from Overpass API (OpenStreetMap)
    try {
      // First check if we already have local hospitals within distance to avoid rate limits
      const existingHospitals = await Hospital.countDocuments({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], maxDistanceInMeters / 6378100] // meters converted to radians
          }
        },
        isActive: true
      });

      if (existingHospitals < 10) { // Fetch if we have fewer than 10 hospitals in this area
        // Fetch within maxDistance (default 100km) and limit to 100 results
        const overpassQuery = `[out:json];node(around:${maxDistanceInMeters},${latitude},${longitude})[amenity=hospital];out 100;`;
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
        
        const response = await axios.get(overpassUrl, { 
          timeout: 8000,
          headers: {
            'User-Agent': 'MediSlot-AI-App/1.0 (Contact: admin@medislot.ai)'
          }
        });
      
      if (response.data && response.data.elements && response.data.elements.length > 0) {
        const bulkOps = [];
        
        for (const el of response.data.elements) {
          if (!el.tags || !el.tags.name) continue; // Skip if no name
          
          const hospitalName = el.tags.name;
          const address = el.tags["addr:full"] || el.tags["addr:street"] || `${hospitalName} Location`;
          const phone = el.tags["phone"] || el.tags["contact:phone"] || "+1 800-000-0000";
          
          bulkOps.push({
            updateOne: {
              filter: { name: hospitalName },
              update: {
                $set: {
                  name: hospitalName,
                  address: address,
                  phone: phone,
                  latitude: el.lat,
                  longitude: el.lon,
                  isActive: true,
                  location: {
                    type: "Point",
                    coordinates: [el.lon, el.lat]
                  }
                },
                $setOnInsert: {
                  departments: ['General Medicine', 'Cardiology', 'Pediatrics'], // Defaults
                  timings: 'Open 24/7',
                  rating: 4 + Math.random(), // Mock rating 4.0 - 5.0
                  image: `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80`
                }
              },
              upsert: true
            }
          });
        }
        
        if (bulkOps.length > 0) {
          await Hospital.bulkWrite(bulkOps);
          console.log(`Successfully synced ${bulkOps.length} real hospitals from OSM!`);
        }
      }
      } // End of existingHospitals check
    } catch (osmError) {
      console.warn("Failed to fetch live OSM data, falling back to local DB:", osmError.message);
    }

    // Find hospitals within the distance using $geoNear aggregation
    // This allows us to calculate and return the exact distance in meters
    const hospitals = await Hospital.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          distanceField: "calculatedDistance",
          maxDistance: maxDistanceInMeters,
          spherical: true,
          query: { isActive: true }
        }
      },
      {
        $project: {
          id: "$_id",
          name: 1,
          address: 1,
          phone: 1,
          departments: 1,
          timings: 1,
          rating: 1,
          image: 1,
          latitude: 1,
          longitude: 1,
          distance: "$calculatedDistance" // distance in meters
        }
      },
      {
        $sort: { distance: 1 } // Sort closest first
      }
    ]);

    res.json({ hospitals });
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get hospital details by ID
// @route   GET /api/hospitals/:id
// @access  Public
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    
    // Map to the requested output format for consistency
    const hospitalData = {
      id: hospital._id,
      name: hospital.name,
      address: hospital.address,
      phone: hospital.phone,
      departments: hospital.departments,
      timings: hospital.timings,
      rating: hospital.rating,
      image: hospital.image,
      latitude: hospital.latitude,
      longitude: hospital.longitude,
      description: hospital.description
    };
    
    res.json(hospitalData);
  } catch (error) {
    console.error('Error fetching hospital:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get recommended slots for a hospital on a specific date
// @route   GET /api/hospitals/:id/recommended-slots
// @access  Public
exports.getRecommendedSlots = async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const date = req.query.date || new Date().toISOString().split('T')[0];

    // For hackathon simplicity, we assume all active doctors can be booked at any hospital
    const doctors = await Doctor.find({ isActive: true });
    
    // Fetch all appointments for these doctors on the selected date
    const appointments = await Appointment.find({ appointmentDate: date, status: { $in: ['booked', 'completed'] } });

    // Generate slots and calculate loads
    let allAvailableSlots = [];
    let doctorLoads = {}; // Keep track of how many appointments each doctor has

    doctors.forEach(doc => {
      doctorLoads[doc._id] = 0;
    });

    appointments.forEach(app => {
      if (doctorLoads[app.doctorId] !== undefined) {
        doctorLoads[app.doctorId]++;
      }
    });

    // Helper to parse time
    const parseHour = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let hour = parseInt(time.split(':')[0]);
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      return hour;
    };

    doctors.forEach(doc => {
      if (!doc.startTime || !doc.endTime) return;
      
      const startHour = parseHour(doc.startTime);
      const endHour = parseHour(doc.endTime);
      const docAppointments = appointments.filter(a => a.doctorId.toString() === doc._id.toString());
      const bookedTimes = docAppointments.map(a => a.appointmentTime);

      for (let i = startHour; i < endHour; i++) {
        const period = i >= 12 ? 'PM' : 'AM';
        const displayHour = i > 12 ? i - 12 : (i === 0 ? 12 : i);
        
        ['00', '30'].forEach(min => {
          const timeString = `${displayHour}:${min} ${period}`;
          if (!bookedTimes.includes(timeString)) {
            allAvailableSlots.push({
              doctorId: doc._id,
              doctorName: doc.name,
              hospitalId: hospitalId,
              date: date,
              time: timeString,
              hour24: i + (min === '30' ? 0.5 : 0), // numeric for sorting
              load: doctorLoads[doc._id]
            });
          }
        });
      }
    });

    if (allAvailableSlots.length === 0) {
      return res.json([]);
    }

    let recommendations = [];

    // Rule 1: Earliest Available
    allAvailableSlots.sort((a, b) => a.hour24 - b.hour24);
    const earliest = { ...allAvailableSlots[0], reason: "Earliest available" };
    recommendations.push(earliest);

    // Rule 2: Lower Doctor Load
    // Filter out the exact same slot to provide variety
    let remainingSlots = allAvailableSlots.filter(s => s.doctorId !== earliest.doctorId || s.time !== earliest.time);
    if (remainingSlots.length > 0) {
      remainingSlots.sort((a, b) => a.load - b.load || a.hour24 - b.hour24); // Sort by load first
      const lowestLoad = { ...remainingSlots[0], reason: "Shorter waiting time" };
      recommendations.push(lowestLoad);
      
      // Rule 3: Optimal Afternoon Slot (first available after 12:00 PM)
      remainingSlots = remainingSlots.filter(s => s.doctorId !== lowestLoad.doctorId || s.time !== lowestLoad.time);
      const afternoon = remainingSlots.find(s => s.hour24 >= 14); // 2:00 PM or later
      if (afternoon) {
        recommendations.push({ ...afternoon, reason: "Optimal Afternoon" });
      }
    }

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommended slots:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get workload summary for doctors in a hospital
// @route   GET /api/hospitals/:id/workload-summary
// @access  Public
exports.getWorkloadSummary = async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const date = req.query.date || new Date().toISOString().split('T')[0];

    // For hackathon simplicity, treat all active doctors
    const doctors = await Doctor.find({ isActive: true });
    
    // Fetch all appointments for the date
    const appointments = await Appointment.find({ appointmentDate: date, status: { $in: ['booked', 'completed'] } });

    let workloads = doctors.map(doc => {
      const docAppointments = appointments.filter(a => a.doctorId.toString() === doc._id.toString());
      return {
        doctorId: doc._id,
        doctorName: doc.name,
        specialization: doc.specialization,
        bookingCount: docAppointments.length
      };
    });

    if (workloads.length === 0) {
      return res.json({ recommended: null, overloaded: null, workloads: [] });
    }

    // Sort by booking count (ascending)
    workloads.sort((a, b) => a.bookingCount - b.bookingCount);

    const recommended = workloads[0]; // Least loaded
    const overloaded = workloads[workloads.length - 1]; // Most loaded

    res.json({
      recommended: {
        ...recommended,
        reason: "Lower appointment load"
      },
      overloaded: {
        ...overloaded,
        reason: "High appointment volume"
      },
      workloads
    });
  } catch (error) {
    console.error('Error fetching workload summary:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
