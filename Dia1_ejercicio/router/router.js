// router.js
const express = require('express');
const auth = require('../auth/auth.js');
const router = express.Router();

router.post("/users", auth, (req, res) => {
    let body = req.body;
    res.status(200).json({
        data: "users post request entertained"
    });
});

module.exports = router;