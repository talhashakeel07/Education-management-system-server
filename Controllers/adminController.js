const User = require('../Models/User')

const addStudent = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, age, classNum, contact } = req.body;
        if (!name || !email) {
            return res.status(400).json({ success: false, msg: "Name and Email are required!" });
        }
          const newStudent = new User({
            name,
            email,
            password,
            role: 'student', 
            age,
            class: classNum, 
            contact
          });

          const savedStudent = await newStudent.save();

          res.status(201).json({
            success: true,
            msg: "Student successfully saved in Database!",
            data: savedStudent
        });
        
    } catch (err) {
        res.status(400).json({ 
            success:false,
            error: err.message
         })
    }
}


const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
        res.status(200).json({ success: true, count: students.length, data: students })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}


const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id
        const updatedData = await User.findByIdAndUpdate(studentId, req.body, { new: true })

        if (!updatedData) return res.status(404).json({ success: false, msg: 'Student not found' })

        res.status(200).json({ success: true, msg: 'Student updated!', data: updatedData })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}


const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id
        await User.findByIdAndDelete(studentId)
        res.status(200).json({ success: true, msg: 'Student deleted successfully!' })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = { addStudent, getAllStudents, updateStudent, deleteStudent }

