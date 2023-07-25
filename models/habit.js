const mongoose = require('mongoose');

const habitSchema = mongoose.Schema(
  {
    habit: {
      type: String,
      required: true,
      unique: true,
    },
    days: [
      {
        date: String,
        status: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;
