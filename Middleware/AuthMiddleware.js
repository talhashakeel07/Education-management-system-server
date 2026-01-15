const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: "Token missing!" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.user = decoded;
        
        // Log for debugging
        console.log(`Middleware: Token Verified. User: ${req.user.name}, Role: ${req.user.role}`);
        
        next(); 
    } catch (err) {
        console.log("Middleware: Token Invalid/Expired");
        return res.status(403).json({ success: false, msg: "Token invalid." });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role.toLowerCase() === 'admin') {
        next();
    } else {
        return res.status(403).json({ success: false, msg: "Admin Access Denied." });
    }
};

module.exports = { verifyToken, isAdmin };