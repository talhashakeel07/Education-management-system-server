require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/connect');
const userRoutes = require('./Routes/User');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ 
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().catch(err => console.error('DB connect failed:', err));

// mount user routes where frontend expects them
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'API Working' });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});