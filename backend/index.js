const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const dotenv = require('dotenv').config();
const userRouter = require('./routes/User');

const app = express();
const port = process.env.PORT || 4444;

app.use(
    cors({
        origin: "http://localhost:3000",  // Adjust to match your frontend
        credentials: true,  // Allow sending cookies
    })
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});