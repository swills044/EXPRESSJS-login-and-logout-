// ! ./src/api/index.js

// * MODULES

const express = require('express'),
    router = express.Router() 


// * ROUTES

router.use('/users', require('./users'))


// * EXPORT ROUTER

module.exports = router;