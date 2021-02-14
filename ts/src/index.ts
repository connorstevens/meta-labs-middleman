// Set up ENV variables
import dotenv from "dotenv";
dotenv.config();

// Import necessary packages
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Import Routes
import AuthRouter from "./routes/auth";

// Get ENV Variables
const PORT = process.env.PORT || 5000;
const IS_DEV = process.env.IS_DEV === "true";
const META_API_KEY = process.env.META_API_KEY;

// Set up Express App
const app = express();

// Set up Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Mount Routes
// Handle all requests to /auth
app.use('/auth', AuthRouter);

// Catch all other requests
// app.use(require('./middleware/404'));

// Listen for requests
app.listen(PORT, () => {

    if(META_API_KEY === ""){
        // tslint:disable-next-line:no-console
        console.log("A Meta Labs API Key is required to start the server.")
        process.exit(0);
    }

    // tslint:disable-next-line:no-console
    console.log(`Server Listening at port ${PORT}`);
    // tslint:disable-next-line:no-console
    if(IS_DEV) console.log("Link: http://localhost:5000/");
})