// const mongoose = require('mongoose')

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/education_platform',{
//              useNewUrlParser: true, useUnifiedTopology: true
//         })
//         console.log('MongoDB Connected Successfully')
//     } catch (error) {
//         console.log(`ERROR IN DB Connection: ${error}`)
       
//     }
// }

// module.exports = connectDB








const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Direct local address use karein testing ke liye
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/education_platform');
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`DB Connection Failed: ${error.message}`);
        process.exit(1); // Agar DB connect na ho to server band ho jaye
    }
};

module.exports = connectDB;