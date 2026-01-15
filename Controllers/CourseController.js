const Course = require('../Models/CourseModel');
const Student = require('../Models/studentModel');

exports.getTeacherAssignedCourses = async (req, res) => {
    try {
        const teacherName = req.user.name;
        const teacherId = req.user.id;
        const courses = await Course.find({
            $or: [
                { teacher: teacherId },
                { teacherName: { $regex: new RegExp("^" + teacherName + "$", "i") } }
            ]
        });
        res.status(200).json(courses);
    } catch (error) { res.status(500).json({ msg: "Server error fetching assigned courses" }); }
};

exports.updateSchedule = async (req, res) => {
    try {
        const { courseId, schedule } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { schedule: schedule },
            { new: true }
        );
        res.status(200).json({ msg: "Schedule updated!", data: updatedCourse });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.submitGrade = async (req, res) => {
    try {
        const { studentId, courseId, grade, remarks } = req.body;
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ msg: "Student not found" });

        const gradeIndex = student.grades.findIndex(g => g.courseId && g.courseId.toString() === courseId);

        if (gradeIndex > -1) {
            student.grades[gradeIndex].grade = grade;
            student.grades[gradeIndex].remarks = remarks;
        } else {
            student.grades.push({ courseId, grade, remarks });
        }

        await student.save();
        res.status(200).json({ msg: "Grade submitted successfully!" });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.addCourse = async (req, res) => {
    try {
        const { courseName, courseCode, description, teacherName, credits } = req.body;
        const newCourse = new Course({ 
            title: courseName, 
            courseCode, 
            description, 
            teacherName: teacherName || 'TBA', 
            credits: credits || 3 
        });
        await newCourse.save();
        res.status(201).json({ msg: "Course Added Successfully", data: newCourse });
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, courses });
    } catch (err) { res.status(500).json({ success: false, msg: 'Server error' }); }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ msg: "Course not found" });
        res.status(200).json(course);
    } catch (err) { res.status(500).json({ msg: "Server Error" }); }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ success: true, msg: 'Course deleted successfully' });
    } catch (err) { res.status(500).json({ msg: 'Server error deleting course' }); }
};

exports.updateCourse = async (req, res) => {
    try {
        const { title, courseCode, description, credits } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id, 
            { title, courseCode, description, credits }, 
            { new: true }
        );
        res.status(200).json({ msg: "Course updated successfully!", data: updatedCourse });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.assignTeacher = async (req, res) => {
    try {
        const { courseId, teacherId, teacherName } = req.body; 
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId, 
            { teacher: teacherId, teacherName: teacherName.trim() }, 
            { new: true }
        );
        res.status(200).json({ msg: "Teacher assigned successfully!", data: updatedCourse });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};