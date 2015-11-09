'use strict';

var express = require('express');
var controller = require('./patient-controller');
var router = express.Router();

router.post('/register', controller.register);
router.post('/delete', controller.deletePatient);
router.post('/update', controller.updatePatient);

module.exports = router;
