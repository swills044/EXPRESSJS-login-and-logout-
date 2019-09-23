// ! ./src/db/db.js

// * MODULES

const mongoose = require('mongoose');
const config = require('../config');


// * INIT DB

// ? Avoiding deprecation warnings by using 'useNewUrlParser' and 'useCreateIndex'
mongoose.connect(config.dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})