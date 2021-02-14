// import Router from express
// const { Router } = require('express');
import * as express from "express";
import type { Router } from "express";

// Require Meta Module
import Meta from "../utils/Meta";

// require Middleware to check request bodies
// const validateBody = require('../middleware/validateBody');
import validateBody from "../middleware/validateBody";

// Create Auth Router
const AuthRouter: Router = express.Router();

// Setup middleware
AuthRouter.use(validateBody);

// handle all POST requests to /auth/login
AuthRouter.post("/login", async function handleLoginRequest(req, res) {
    const { license, machine } = req.body;

    try{
        if(machine){
            const authResponse = await Meta.login(license, machine);
            res.status(200).json(authResponse);
        }
        else{
            res.status(400).send();
        }
    }
    catch(err){
        return res.status(400).send();
    }
});

// handle all POST requests to /auth/reset
AuthRouter.post("/reset", async function handleResetRequest(req, res) {
    const { license } = req.body;

    try{
        const authResponse = await Meta.reset(license);
        res.status(200).json(authResponse);
    }
    catch(err){
        return res.status(400).send();
    }
});

export default AuthRouter;