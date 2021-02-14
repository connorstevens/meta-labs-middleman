const validateBody = (req, res, next) => {
    if(req.body && req.body.license) {
        return next();
    }
    else{
        return res.status(400).send();
    }
}

module.exports = validateBody;