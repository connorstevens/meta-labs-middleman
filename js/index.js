//Set up ENV variables
require('dotenv').config();

//Require necessary packages
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

//Get ENV Variables
const PORT = process.env.PORT || 5000;
const IS_DEV = process.env.IS_DEV == "true";
const META_API_KEY = process.env.META_API_KEY;

//Set up Express App
const app = express();

//Set up Middleware
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());

//Mount Routes
//Handle all requests to /auth
app.use('/auth', require('./routes/auth'));

//Catch all other requests
// app.use(require('./middleware/404'));

//Listen for requests
app.listen(PORT, () => {

    if(META_API_KEY == ""){
        console.log("A Meta Labs API Key is required to start the server.")
        process.exit(0);
    }

    console.log(`Server Listening at port ${PORT}`);
    if(IS_DEV) console.log("Link: http://localhost:5000/");
})