require('dotenv').config(); // .env ফাইল লোড করার জন্য
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// রাউট ফাইলগুলো ইমপোর্ট করা
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const app = express();

// মিডলওয়্যার (Middleware) কনফিগারেশন
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ডাটাবেজ কানেকশন (.env ফাইল থেকে MONGO_URI নিয়ে নেওয়া হবে)
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API রুটসমূহ (API Routes)
app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

// হোম রুট (Home Route)
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Welcome to Distributed Cloud Storage API (2026 Edition)!",
        status: "Active and Running"
    });
});

// সার্ভার পোর্ট সেটআপ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🌐 Server is running smoothly on port ${PORT}`);
});