const express = require("express");
const router = express.Router();
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');
const AuthController = require("../api/auth.js");


//user
router.post("/add-auth", authorize(Role.SUPER_ADMIN, Role.SITE_ADMIN), AuthController.addAuth);
router.get("/auth", authorize(Role.SUPER_ADMIN, Role.SITE_ADMIN), AuthController.getAllAuth);
router.get("/authById?:id", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), AuthController.getAuth);
router.post("/edit-auth", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), AuthController.editAuth);
router.delete('/deleteauth', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), AuthController.deleteAuth);
router.post('/auth/status', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), AuthController.updateStatus);



module.exports = router;

