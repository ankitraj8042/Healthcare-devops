const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", async (req, res) => {
  const { patientName, doctorName, date } = req.body;

  if (!patientName || !doctorName || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date." });
  }

  try {
    const appointment = await Appointment.create({
      patientName: patientName.trim(),
      doctorName: doctorName.trim(),
      date: parsedDate,
      status: "pending"
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});

router.get("/", async (_req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 });
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});

router.put("/:id", async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
