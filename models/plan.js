const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    planName: {
        type: String,
        required: true
    },       
    planIsInstitutional: {
        type: Boolean,
        default: false
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);


