'use strict';

var express = require('express');
var controller = require('./config-controller');
var router = express.Router();

router.post('/webapp', controller.config);

module.exports = router;
