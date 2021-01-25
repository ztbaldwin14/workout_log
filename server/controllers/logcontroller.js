let express = require('express');
let router = express.Router();
// const validateSession = require('../middleware/validate-session');
// const Journal = require('../db').import('../models/journal');

router.get('/practice', function (req, res){
    res.send("This is a practice route!");
});

module.exports = router;