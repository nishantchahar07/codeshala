const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./Config/database');
require('dotenv').config();

const app = express();

// Connect to database
dbConnect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/course', require('./routes/course'));
app.use('/api/v1/category', require('./routes/category'));
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/section', require('./routes/section'));
app.use('/api/v1/subsection', require('./routes/subsection'));
app.use('/api/v1/tag', require('./routes/tag'));

// Default route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Server is running"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});