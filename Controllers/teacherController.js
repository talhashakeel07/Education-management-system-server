
const User = require('../Models/User'); 

exports.addTeacher = async (req, res) => {
    try {
        const { name, email, password, department, phone } = req.body;
        const existingTeacher = await User.findOne({ email });
        if (existingTeacher) return res.status(400).json({ msg: "Email pehle se registered hai" });

        const newTeacher = new User({
            name,
            email,
            password, 
            role: 'teacher',
            department,
            contactInfo: phone
        });

        await newTeacher.save();
        res.status(201).json({ msg: "Teacher registered successfully!" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' }).select('-password');
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTeacher = await User.findByIdAndDelete(id);
        
        if (!deletedTeacher) {
            return res.status(404).json({ msg: "Teacher nahi mila!" });
        }
        
        res.status(200).json({ msg: "Teacher deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};