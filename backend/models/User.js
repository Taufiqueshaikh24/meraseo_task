const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a Name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [50, 'Password cannot be more than 50 characters'],
    },
   
},{timestamps:true});

UserSchema.pre('save', async function(next) {
    console.log("This is the password: ", this.password);
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


UserSchema.methods.signedJwtToken = function(){
    return jwt.sign({id : this._id} ,  process.env.JWT_SECRET , {
            expiresIn: '1h',
    })
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
