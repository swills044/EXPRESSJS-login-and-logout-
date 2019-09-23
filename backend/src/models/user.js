// ! ./src/models/user.js

// * MODULES

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')


// * SCHEMA

const Schema = mongoose.Schema;
const userSchema = new Schema({

    display_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)){
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },

    }]

})


// * METHODS

// ? Middleware
userSchema.pre('save', function (next) {
    // ? Hash password before it saves
    const user = this
    if (user.isModified('password')){
        user.password = bcrypt.hash(user.password, 8);
    }
    next()
})

// ? Give user access
userSchema.methods.generateAuthToken = async function () {
    //Generate an Auth token for user
    const user = this
    console.log(this);
    const token = jwt.sign({_id: user._id}, config.jwtSecret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// ? Find specific user
userSchema.methods.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}


// * Export
const User = mongoose.model('User', userSchema)

module.exports = User