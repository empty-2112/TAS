const express = require('express');
const router = express.Router();
const { SelectALL } = require('../model/CRUD');

express().set('view engine', 'ejs');
router.get('/', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        res.render('../views/pages/index.ejs', {
            User: req.session.User
        });
    }
})
router.post('/data1/index', (req, res) => {
    try {
        SelectALL("donhang", (err, data) => {
            if (err) {

            } else {
                res.json(data);
            }
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;