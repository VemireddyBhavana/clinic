const Hospital = require('../models/Hospital');
const axios = require('axios');

// @desc    Get nearby hospitals based on lat and lng
// @route   GET /api/hospitals/nearby
// @access  Public
exports.getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng, distance = 50000 } = req.query; // Default 50km

    if (!lat || !lng) {
      // If no location provided, just return all hospitals
      const hospitals = await Hospital.find({ isActive: true });
      return res.json(hospitals.map(h => ({
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
      })));
    }

    // Convert string to float
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const maxDistanceInMeters = parseInt(distance);

    // LIVE DATA INTEGRATION: Fetch from Overpass API (OpenStreetMap)
    try {
      // 15km radius (15000 meters)
      const overpassQuery = `[out:json];node(around:15000,${latitude},${longitude})[amenity=hospital];out 15;`;
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

    res.json(hospitals);
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
