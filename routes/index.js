const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Already to connect server'
    });
});

module.exports = router;
