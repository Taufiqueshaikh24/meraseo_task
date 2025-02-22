const mongoose = require('mongoose');

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB Connected at Host ${connect.connection.host}`);
}

module.exports = connectDB ; 