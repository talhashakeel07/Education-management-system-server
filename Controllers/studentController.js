const Student = require('../Models/studentModel');
const Enrollment = require('../Models/EnrollmentModel');
const Course = require('../Models/CourseModel'); 
const bcrypt = require('bcryptjs');

// 1. Get All Students (For Admin)
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// 2. Add Student (For Admin)
exports.addStudent = async (req, res) => {
    try {
        const { name, email, rollNumber, course } = req.body;
        const existing = await Student.findOne({ email });
        if (existing) return res.status(400).json({ msg: "Email already exists" });

        const defaultPass = "student123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPass, salt);

        const newStudent = new Student({
            name, email, rollNumber, course,
            password: hashedPassword,
            role: 'student'
        });

        await newStudent.save();
        res.status(201).json({ msg: `Student added! Pass: ${defaultPass}` });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// 3. Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Student Deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// 4. Get All Courses (For Catalog)
exports.getAllCatalog = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// 5. Enroll in Course (Student Logic)
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const studentId = req.user.id; // verifyToken middleware se aayega

        // Check karein kahin student pehle se enroll toh nahi
        const existing = await Enrollment.findOne({ studentId, courseId });
        if (existing) {
            return res.status(400).json({ msg: "Aap pehle hi is course mein enroll hain!" });
        }

        const newEnrollment = new Enrollment({ studentId, courseId });
        await newEnrollment.save();

        res.status(200).json({ msg: "Enrollment successful!" });
    } catch (err) {
        console.error("Enrollment Error:", err);
        res.status(500).json({ msg: "Enrollment fail ho gayi" });
    }
};

// 6. Get My Courses (Study Hall Logic)
exports.getMyCourses = async (req, res) => {
    try {
        const studentId = req.user.id;
        // Populate se Course ka pura data (title, courseCode) mil jayega
        const enrollments = await Enrollment.find({ studentId }).populate('courseId');
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ msg: "Courses fetch fail: " + err.message });
    }
};