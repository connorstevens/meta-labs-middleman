import type { RequestHandler, Request, Response, NextFunction } from 'express';

const validateBody: RequestHandler = function validateRequestBody(req: Request, res: Response, next: NextFunction){
    if(req.body && req.body.license) {
        return next();
    }
    else{
        return res.status(400).send();
    }
}

export default validateBody;