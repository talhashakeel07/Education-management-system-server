const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    courseCode: { type: String, required: true, unique: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, 
    teacherName: { type: String, default: 'TBA' },
    credits: { type: Number, default: 3 },
    // Naya Field: Schedule ke liye
    schedule: { type: String, default: 'Not Set' } 
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);