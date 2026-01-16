const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/education_platform';
        
        const conn = await mongoose.connect(dbURI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`DB Connection Failed: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;