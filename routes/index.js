var express = require("express");
var router = express.Router();
const authenticate = require("./authenticate");
const user = require("./users");
const passwordpolicy = require('./passwordpolicy');
const domain = require('./domain');
const pinpolicy = require('./pinpolicy');
const theme_settings = require('./theme_settings');
const auth = require('./auth');




router.get("/", function (req, res, next) {
    res.send('ExpressJs Server is Running...')
});

router.use(
    "/api",
    authenticate,
    user,
    passwordpolicy,
    domain,
    pinpolicy,
    theme_settings,
    auth
);
module.exports = router;