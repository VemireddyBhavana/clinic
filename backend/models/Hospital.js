const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  // GeoJSON for location-based querying
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    }
  },
  departments: {
    type: [String],
    default: []
  },
  timings: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to automatically populate the GeoJSON location field based on latitude and longitude
hospitalSchema.pre('save', function(next) {
  if (this.latitude && this.longitude) {
    this.location = {
      type: 'Point',
      coordinates: [this.longitude, this.latitude]
    };
  }
  next();
});

// Create 2dsphere index for geospatial queries
hospitalSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hospital', hospitalSchema);
