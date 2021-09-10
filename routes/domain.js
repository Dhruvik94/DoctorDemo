const express = require("express");
const router = express.Router();
const Role = require('../helpers/role');
const authorize = require('../helpers/authorize');
const DomainController = require("../api/domain_api");
const multer = require('multer');


//user
router.post("/add-domain", authorize(Role.SUPER_ADMIN, Role.SITE_ADMIN), DomainController.addDomain);
router.get("/domain", authorize(Role.SUPER_ADMIN, Role.SITE_ADMIN), DomainController.getAllDomain);
router.get("/domainById?:domain_name", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), DomainController.getDomain);
router.get("/domainByUser", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), DomainController.getDomainByUser);
router.post("/edit-domain", authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), DomainController.editDomain);
router.delete('/deletedomain', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), DomainController.deleteDomain);
router.post('/domain/status', authorize([Role.SUPER_ADMIN, Role.SITE_ADMIN]), DomainController.updateDomain);


module.exports = router;
