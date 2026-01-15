const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    role: { type: String, default: 'student' },
    // Naya Field: Course wise grades aur remarks ke liye
    grades: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        grade: { type: String, default: 'Pending' },
        remarks: { type: String, default: '' }
    }],
    course: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);