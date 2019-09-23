// ! ./src/middlewares/auth.js

// *  MODULES

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config.js')


// * AUTHENTICATION

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, config.jwtSecret)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token})
        if (!user){
            throw new Error ()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource'})
    }
}


// * EXPORT MODULE

module.exports = auth