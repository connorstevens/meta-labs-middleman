import type { RequestHandler, Request, Response, NextFunction } from 'express';

const error: RequestHandler = function handleError (req: Request, res: Response, next: NextFunction){
    return res.status(404).send();
}

export default error;