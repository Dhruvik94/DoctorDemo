const express = require("express");
const router = express.Router();
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');
const UserController = require("../api/users_api");
const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads/images' });



//user
router.post("/add-site-admin", authorize(Role.SUPER_ADMIN, Role.SITE_ADMIN), UserController.addSiteAdmin);
router.get("/users/site-admin", authorize(Role.SUPER_ADMIN, Role.SITE_ADMIN), UserController.getAllSiteAdmin);
router.get("/user?:email", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.getSiteAdmin);
router.post("/edit-site-admin", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.editSiteAdmin);
router.delete('/deleteUser?:id', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.deleteUser);
router.put("/reset-password", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.resetPassword);
router.put("/forgotpassword", UserController.forgotPassword);

router.put("/forgotpassword-sendemail", UserController.forgotPasswordEmail);
router.put("/confirm-email", UserController.confirmEmail);


router.post("/user/status", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.updateUserStatus);
router.get('/get-profile', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.getImage);
router.put("/edit-profile", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.editProfile);
router.post('/delete-profile', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.deleteProfile);
router.post('/upload-default-profile', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), UserController.uploadDefaultImage);
router.post('/upload-profile', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]),
    upload.single('photo'), (req, res) => {
        UserController.uploadImage(req, res);
    });


module.exports = router;
