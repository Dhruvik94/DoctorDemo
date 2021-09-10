const express = require("express");
const router = express.Router();
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');
const PasswordPolicyController = require("../api/passwordpolicy_api");

/**
 * Password policy API
 */

router.post("/passwordpolicy/add", authorize(Role.SUPER_ADMIN), PasswordPolicyController.addPasswordPolicy);
router.post("/passwordpolicy/update", authorize(Role.SUPER_ADMIN), PasswordPolicyController.updatePasswordpolicy);
router.get("/passwordpolicies", authorize(Role.SUPER_ADMIN), PasswordPolicyController.getPasswordPolicies);
router.get("/passwordpolicy?:id", authorize(Role.SUPER_ADMIN), PasswordPolicyController.getPasswordPolicy);
router.post("/passwordpolicy/status", authorize(Role.SUPER_ADMIN), PasswordPolicyController.updatePasswordPolicyStatus);
router.delete('/deletepasswordpolicy', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), PasswordPolicyController.deletePasswordpolicy);


module.exports = router;
