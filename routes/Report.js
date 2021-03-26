const express = require('express');
const async = require("async");
const router = express.Router();
const { ALLDHSuccess, ReportDH } = require('../model/CRUD');
const ReportFile = require('../model/Report');

express().set('view engine', 'ejs');
router.get('/', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        ALLDHSuccess().then((result) => {
            result.forEach(e => {
                e.datecreate = new Date(e.datecreate).toLocaleString();
            })
            res.render('../views/pages/Report.ejs', {
                User: req.session.User,
                Data: result
            });
        }).catch(err => {
            res.render('../views/pages/Report.ejs', {
                User: req.session.User,
                Data: null
            });
        })
    }
});
router.get('/Download', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        var id = req.query.id;
        ReportDH(id).then(data => {
            ReportFile(data[0]).then(result => {
                res.sendFile('./Report/PhieuXuatHang.xlsx', { root: '.' });
            })
        }).catch(err => {
            console.log(err);
        })
    }
});

module.exports = router;