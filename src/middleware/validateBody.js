module.exports = function auth(req, res, next) {
    if (!req.body.license) return res.sendStatus(401);

    next();
}