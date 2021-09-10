const express = require("express");
const router = express.Router();
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');
const PinPolicyController = require("../api/pinpolicy_api");

/**
 * PinPolicy API
 */

router.post("/pinpolicy/add", authorize(Role.SUPER_ADMIN), PinPolicyController.addPinpolicy);
router.post("/pinpolicy/update", authorize(Role.SUPER_ADMIN), PinPolicyController.updatePinpolicy);
router.get("/pinpolicies", authorize(Role.SUPER_ADMIN), PinPolicyController.getPinpolicies);
router.get("/pinpolicy?:id", authorize(Role.SUPER_ADMIN), PinPolicyController.getPinpolicy);
router.post("/pinpolicy/status", authorize(Role.SUPER_ADMIN), PinPolicyController.updatePinpolicyStatus);
router.delete('/deletepinpolicy', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), PinPolicyController.deletePinPolicy);


module.exports = router;
