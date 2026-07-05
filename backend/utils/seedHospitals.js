const mongoose = require('mongoose');
const Hospital = require('../models/Hospital');

const mockHospitals = [
  {
    name: "Mount Sinai Hospital",
    address: "1468 Madison Ave, New York, NY 10029",
    phone: "+1 (212) 241-6500",
    latitude: 40.7903,
    longitude: -73.9529,
    departments: ["Cardiology", "Neurology", "Orthopedics", "Emergency Medicine", "Pediatrics"],
    timings: "24/7 Emergency, Outpatient: 8:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    description: "One of the oldest and largest teaching hospitals in the United States, providing comprehensive healthcare services.",
    isActive: true
  },
  {
    name: "Lenox Hill Hospital",
    address: "100 E 77th St, New York, NY 10075",
    phone: "+1 (212) 434-2000",
    latitude: 40.7738,
    longitude: -73.9606,
    departments: ["Maternity", "Cardiothoracic Surgery", "Urology", "Internal Medicine"],
    timings: "24/7 Emergency, Outpatient: 7:30 AM - 5:30 PM",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    description: "A 450-bed tertiary care hospital in Manhattan's Upper East Side.",
    isActive: true
  },
  {
    name: "NYU Langone Health",
    address: "550 1st Ave, New York, NY 10016",
    phone: "+1 (646) 929-7800",
    latitude: 40.7420,
    longitude: -73.9739,
    departments: ["Oncology", "Rehabilitation", "Neurosurgery", "Dermatology", "Gastroenterology"],
    timings: "24/7 Emergency, Outpatient: 8:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1538108149393-cebb47acdd4e?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    description: "A premier academic medical center devoted to patient care, education, and research.",
    isActive: true
  },
  {
    name: "NewYork-Presbyterian Hospital",
    address: "525 E 68th St, New York, NY 10065",
    phone: "+1 (212) 746-5454",
    latitude: 40.7641,
    longitude: -73.9546,
    departments: ["Psychiatry", "Pediatrics", "Transplant Surgery", "Endocrinology"],
    timings: "24/7 Emergency, Outpatient: 9:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    description: "Ranked among the top hospitals in the nation, offering cutting-edge treatments.",
    isActive: true
  },
  {
    name: "Bellevue Hospital Center",
    address: "462 1st Ave, New York, NY 10016",
    phone: "+1 (212) 562-4141",
    latitude: 40.7394,
    longitude: -73.9754,
    departments: ["Trauma Center", "Psychiatry", "General Surgery", "Infectious Diseases"],
    timings: "24/7 Emergency, Outpatient: 8:00 AM - 4:00 PM",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    description: "The oldest public hospital in the US, known for its leading trauma and psychiatric centers.",
    isActive: true
  },
  {
    name: "Brooklyn Hospital Center",
    address: "121 DeKalb Ave, Brooklyn, NY 11201",
    phone: "+1 (718) 250-8000",
    latitude: 40.6908,
    longitude: -73.9785,
    departments: ["Obstetrics", "Family Medicine", "Emergency Medicine", "Radiology"],
    timings: "24/7 Emergency, Outpatient: 8:30 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
    description: "Providing outstanding health services, education, and research to keep Brooklyn healthy.",
    isActive: true
  },
  {
    name: "Maimonides Medical Center",
    address: "4802 10th Ave, Brooklyn, NY 11219",
    phone: "+1 (718) 283-6000",
    latitude: 40.6385,
    longitude: -73.9961,
    departments: ["Pediatrics", "Cardiology", "Stroke Center", "Orthopedics"],
    timings: "24/7 Emergency, Outpatient: 8:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    description: "The largest hospital in Brooklyn and at the forefront of medical advancement.",
    isActive: true
  },
  {
    name: "Stony Brook University Hospital",
    address: "101 Nicolls Rd, Stony Brook, NY 11794",
    phone: "+1 (631) 444-4000",
    latitude: 40.9088,
    longitude: -73.1118,
    departments: ["Cancer Center", "Heart Institute", "Neurology", "Pediatrics"],
    timings: "24/7 Emergency, Outpatient: 9:00 AM - 7:00 PM",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    description: "Long Island's premier academic medical center.",
    isActive: true
  }
];

const seedHospitals = async () => {
  try {
    const count = await Hospital.countDocuments();
    if (count === 0) {
      console.log('Seeding Phase 2 realistic hospitals into database...');
      const hospitalsToInsert = mockHospitals.map(h => ({
        ...h,
        location: {
          type: 'Point',
          coordinates: [h.longitude, h.latitude]
        }
      }));
      await Hospital.insertMany(hospitalsToInsert);
      console.log('Mock hospitals seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding hospitals:', error);
  }
};

module.exports = seedHospitals;
