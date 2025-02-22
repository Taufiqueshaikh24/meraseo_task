const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User'); // Adjust the import path

// ✅ REGISTER USER
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = new UserSchema({ email, password, name });
        await user.save();

        // ✅ Generate token
        const token = user.signedJwtToken();

        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent JavaScript access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for CORS
            maxAge: 3600000, // 1 hour
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

// ✅ LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // ✅ Generate token
        const token = user.signedJwtToken();

        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookies for production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for CORS
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

// ✅ GET USER INFO (Authenticated Route)
const Me = async (req, res) => {
    const token = req.cookies.token; // Read the token from cookies
    console.log('Token from cookie:', token); // Debugging

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Debugging

        const user = await UserSchema.findById(decoded.id);
        console.log('User found:', user); // Debugging

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

// ✅ LOGOUT USER (Clears the cookie)
const logoutUser = (req, res) => {
    res.cookie("token", "", { maxAge: 0 }); // Expire the cookie
    res.status(200).json({ message: "Logged out successfully" });
};

// ✅ EXPORT MODULES
module.exports = {
    registerUser,
    loginUser,
    Me,
    logoutUser,
};
