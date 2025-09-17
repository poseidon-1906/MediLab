import express from 'express';
import { loginDoctor, appointmentsDoctor, appointmentCancel, doctorList, changeAvailablity, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile, addPatientRecord, getPatientRecordsForDoctor, getRecordsForAppointment, getAppointmentDetails } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';
const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor)
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.get("/list", doctorList)
doctorRouter.post("/change-availability", authDoctor, changeAvailablity)
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)
doctorRouter.post("/add-record", authDoctor, addPatientRecord)
doctorRouter.get("/patient-records/:patientId", authDoctor, getPatientRecordsForDoctor)
doctorRouter.get("/appointment/:appointmentId", authDoctor, getAppointmentDetails)
doctorRouter.get("/records/:appointmentId", authDoctor, getRecordsForAppointment)

export default doctorRouter;