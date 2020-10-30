const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    partName: {
        type: String,
        required: true,
      },        
    partSsn: {
        type: String,
        default: '',
      },
    partIsHce: {
        type: Boolean,
        default: false,
      },      
    partIsActive: {
        type: Boolean,
        default: true,
      },      
  },
  { timestamps: true }
);

module.exports = mongoose.model('Participant', participantSchema);

