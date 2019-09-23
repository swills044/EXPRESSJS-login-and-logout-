// !  ./src/config.js

require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV ||'development';

module.exports = {

    port    :  process.env.PORT || 3030,
    dbURL   :  process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    logs: {
        format: process.env.FORMAT_TYPE || 'combined'
    },
    api: {
        prefix: '/api'
    }

};
