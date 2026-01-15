const express = require('express');
const router = express.Router();

// Controllers Import
const authController = require('../Controllers/AuthController');
const teacherController = require('../Controllers/teacherController');
const courseController = require('../Controllers/CourseController');
const studentController = require('../Controllers/studentController');

const { verifyToken, isAdmin } = require('../Middleware/AuthMiddleware');

router.post('/login', authController.login);

router.put('/update-schedule', verifyToken, courseController.updateSchedule);
router.post('/submit-grade', verifyToken, courseController.submitGrade);

router.get('/all-students', verifyToken, (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'teacher') next();
    else return res.status(403).json({ msg: "Access denied." });
}, studentController.getAllStudents);

router.post('/add-teacher', verifyToken, isAdmin, teacherController.addTeacher);
router.get('/all-teachers', verifyToken, teacherController.getAllTeachers);
router.delete('/delete-teacher/:id', verifyToken, isAdmin, teacherController.deleteTeacher);
router.post('/add-student', verifyToken, isAdmin, studentController.addStudent);
router.delete('/delete-student/:id', verifyToken, isAdmin, studentController.deleteStudent);

router.post('/add-course', verifyToken, isAdmin, courseController.addCourse);
router.get('/admin/all-courses', verifyToken, isAdmin, courseController.getAllCourses);
router.put('/assign-teacher', verifyToken, isAdmin, courseController.assignTeacher);
router.delete('/delete-course/:id', verifyToken, isAdmin, courseController.deleteCourse);


router.get('/course/:id', verifyToken, courseController.getCourseById);
router.put('/update-course/:id', verifyToken, courseController.updateCourse);

router.get('/assigned-courses', verifyToken, (req, res, next) => {
    if (req.user.role === 'teacher') next();
    else return res.status(403).json({ msg: "Only Teachers allowed." });
}, courseController.getTeacherAssignedCourses);


router.get('/all-courses', verifyToken, studentController.getAllCatalog);
router.post('/enroll', verifyToken, studentController.enrollInCourse);
router.get('/my-enrollments', verifyToken, studentController.getMyCourses);

module.exports = router;