const jwt = require('jsonwebtoken');
const config = require('../config');

var jwtVerify = function(req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    // decode jwt token
    jwt.verify(token, config.secret, (err, payload) => {
        console.log(payload);
        // if deocde fail or the token is expired
        if (err || payload.ext < Date.now() / 1000) {
            res.status(401).send({
                "error": "Unauthorized"
            });
        // add payload to req
        } else {
            req.payload = payload;
            next();
        }
    });
}

module.exports = jwtVerify;
