const express = require("express");
const router = express.Router();
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');
const ThemeSettingsCountroller = require("../api/theme_settings_api");

/**
 * Theme Settings API
 */

router.post("/theme/add", authorize([Role.SUPER_ADMIN,Role.SITE_ADMIN]), ThemeSettingsCountroller.selectTheme);
router.get("/theme?:user_id", authorize([Role.SUPER_ADMIN,Role.SITE_ADMIN]), ThemeSettingsCountroller.getTheme);

module.exports = router;
