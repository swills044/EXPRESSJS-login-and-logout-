// ! ./src/users.js

// * MODULES

const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    auth = require('../middlewares/auth')


// * ROUTES

// ? Register user
router.post('/', async function(req, res) {
    // Create a new user
    try {
        //TODO if users are using the same email alot then give them a warning: 'You seem to be using that email alot... ', avoid spam by doing this
        const user = new User(req.body)
        await user.save()
        console.log(user);
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// ? Allow users to login
router.post('/login', async function(req, res) {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

// ? Allow users to logout
router.post('/logout', auth, async function(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})


// ? Allow users to logout from all devices (Different tokens)
router.post('/logoutAll', auth, async function(req, res) {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {

    }
})

// ? Get user profile info
router.get('/me', auth, function(req, res) {
    res.send(req.user);
})

// ? Update user profile info
router.put('/', auth, function(req, res) {
    // user = req.user.id
    // text = req.body.text

    // User.create(user, text, function (err, comment) {
    //     res.redirect('/')
    // })
})

// ? Delete user
router.delete('/', auth, function(req, res) {
    // user = req.user.id
    // text = req.body.text

    // User.create(user, text, function (err, comment) {
    //     res.redirect('/')
    // })
})

// * EXPORT ROUTER

module.exports = router;

