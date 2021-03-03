const express = require('express');
const router = express.Router();
const { SelectALL, InsertKH, SelectByIDFromKH, UpdateKH, DeleteKH } = require('../model/CRUD');

express().set('view engine', 'ejs');
router.get('/', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectALL("KHACHHANG", (err, data) => {
            if (err) {

            } else {
                res.render('../views/pages/khachhang.ejs', {
                    User: req.session.User,
                    Data: data
                });
            }
        })
    }
});
router.get('/CREATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        res.render('../views/pages/form-khachhang.ejs', {
            User: req.session.User,
            Data: [{
                id: null,
                tenKH: null,
                masothue: null,
                diachi: null,
                email: null,
                sdt: null,
                sofax: null,
                note: null,
            }],
            message: "CREATE"
        })
    }
});
router.post('/CREATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        InsertKH({
            tenKH: req.body.para1,
            masothue: req.body.para2,
            diachi: req.body.para3,
            email: req.body.para4,
            sdt: req.body.para5,
            sofax: req.body.para6,
            note: req.body.para7
        }).then((result) => {
            res.redirect("/KH");
        })
    }
});
router.get('/UPDATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectByIDFromKH(req.query.id, (err, data) => {
            if (err) {

            } else {
                res.render('../views/pages/form-khachhang.ejs', {
                    User: req.session.User,
                    Data: data,
                    message: "UPDATE"
                })
            }
        })
    }
});
router.post('/UPDATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        UpdateKH([req.body.para1, req.body.para2, req.body.para3, req.body.para4, req.body.para5, req.body.para6, req.body.para7, req.body.para0]).then((result) => {
            res.redirect("/KH");
        })
    }
});
router.get('/DETAIL', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectByIDFromKH(req.query.id, (err, data) => {
            if (err) {

            } else {
                res.render('../views/pages/form-khachhang.ejs', {
                    User: req.session.User,
                    Data: data,
                    message: "DETAIL"
                })
            }
        })
    }
});
router.get('/DELETE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        DeleteKH(req.query.id).then((result) => {
            res.redirect("/KH");
        })
    }
});
module.exports = router;