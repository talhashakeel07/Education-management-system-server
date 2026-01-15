const Student = require('../Models/studentModel');
const User = require('../Models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Student.findOne({ email }) || await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: "Invalid Email or Password" });

        const isMatch = await bcrypt.compare(password, user.password) || (password === user.password);
        if (!isMatch) return res.status(400).json({ msg:"Invalid Email or Password" });

        const token = jwt.sign(
    { 
        id: user._id,    
        role: user.role, 
        name: user.name 
    }, 
    process.env.JWT_SECRET || 'your_secret_key', 
    { expiresIn: '1d' }
);

        res.status(200).json({ 
            token, 
            user: { id: user._id, name: user.name, role: user.role } 
        });
    } catch (err) { res.status(500).json({ msg: "Server error" }); }
};