// !  ./src/index.js

// * MODULES

const express = require('express'),
    app = express(); 
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config');

require('./db/db');


// * MIDDLEWARE

// ? adding Helmet to enhance your API's security
app.use(helmet());

// ? using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// ? enabling CORS for all requests
app.use(cors());

// ? adding morgan to log HTTP requests
app.use(morgan('combined'));

// ? custom middleware
app.use(require('./middlewares/user'));
app.use(require('./api'));



// * INIT APP

app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}`)
})

