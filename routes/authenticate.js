const express = require("express");
const router = express.Router();
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');
const AuthenticationController = require("../api/authenticate_api");

// Authentication API
router.post("/authenticate", AuthenticationController.authenticateUser);
router.post("/verify-otp", AuthenticationController.verifyOTP);
router.get("/validate-token", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), AuthenticationController.verifyToken);
router.post("/password-policy", AuthenticationController.passwordPolicy);

module.exports = router;
