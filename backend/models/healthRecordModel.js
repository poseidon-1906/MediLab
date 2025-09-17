import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment',
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    allergies: [{
        type: { type: String },
        detail: { type: String }
    }],
    vaccinations: [{
        vaccin: { type: String },
        date1: { type: Date },
        date2: { type: Date },
        rappelPrevu: { type: Date },
        observations: { type: String }
    }],
    labResults: [{
        test: { type: String },
        result: { type: String },
        file: { type: String },
        date: { type: Date }
    }]
}, { timestamps: true });

const healthRecordModel = mongoose.models.healthRecord || mongoose.model('healthRecord', healthRecordSchema);

export default healthRecordModel;