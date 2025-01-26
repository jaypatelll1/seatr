const express = require('express');
const { sendNotification } = require('../controllers/notif.controller');

const router = express.Router();

router.post('/',sendNotification);


module.exports = router;