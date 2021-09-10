const jwt = require('jsonwebtoken');
const { jwt_secret, jwt_issuer } = require('../config.js');
const helpers = require('../helpers/validations');

module.exports = authorize;

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        (req, res, next) => {

            var token;
            var options;

            try {
                try {

                    token = req.headers.authorization.split(' ')[1];
                    options = {
                        expiresIn: 60 * 60 * 24,
                        issuer: jwt_issuer
                    };

                } catch (err) {
                    return res.status(401).json({
                        status: 401,
                        code: "E_UNAUTHORIZED",
                        data: null,
                        message: "Jwt token is missing in request"
                    });
                }

                result = jwt.verify(token, jwt_secret, options);
                req.decoded = result;
                if (req.body.body_encrypted) {
                    let original_data = helpers.decrypt(req.body.body_encrypted);
                    console.log(original_data);
                    req.body = original_data;
                }

                if (roles.length && !roles.includes(req.decoded.role)) {
                    return res.status(401).json({
                        status: 401,
                        code: "E_PERMISSION_DENIED",
                        data: null,
                        message: "Permission denied"
                    });
                }

                next();
            } catch (err) {
                console.log("jwt error >> " + err);
                return res.status(200).json({
                    status: 699,
                    code: "E_TOKEN_EXPIRED",
                    message: "JWT Token is expired or invalid"
                });
            }
        }
    ];
}