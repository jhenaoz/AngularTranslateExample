'use strict';

var express = require('express');
var controller = require('./user-controller');
var router = express.Router();

router.post('/login', controller.login);
router.post('/forgot', controller.forgot);
router.post('/accept/invitation/:code', controller.acceptInvitation);
router.get('/invitation/:code', controller.invitation);
router.post('/reset/password/:code', controller.resetPassword);

module.exports = router;
