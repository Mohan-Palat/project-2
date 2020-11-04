const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
  {
    planName: {
        type: String,
        required: true,
      },        
    planEmail: {
        type: String,
        default: '',
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Email', emailSchema);

