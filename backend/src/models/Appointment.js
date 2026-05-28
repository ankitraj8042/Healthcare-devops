const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    doctorName: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
