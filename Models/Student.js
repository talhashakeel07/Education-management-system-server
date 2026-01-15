const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    rollNumber: { 
        type: String, 
        required: true,
        unique: true
    },
    rollNumber: { type: String, required: true, unique: true },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', // Ye wahi naam hona chahiye jo apne Course model mein rakha hai
        required: true 
    }
}, { timestamps: true });



module.exports = mongoose.model('Student', studentSchema);  