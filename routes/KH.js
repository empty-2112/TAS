const express = require('express');
const multer = require('multer');
const router = express.Router();
const { SelectALL, InsertKH, SelectByIDFromKH, UpdateKH, DeleteKH } = require('../model/CRUD');

express().set('view engine', 'ejs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/Storage')
    },
    filename: function(req, file, cb) {
        cb(null, 'TX' + file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.')[1])
    }
})

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    try {
        if (req.session.User == undefined || req.session.isAuth == false) {
            res.redirect("/user/login");
        } else {
            SelectALL("KHACHHANG", (err, data) => {
                if (err) {
                    res.render('../views/pages/khachhang.ejs', {
                        User: req.session.User,
                        Data: null
                    });
                } else {
                    res.render('../views/pages/khachhang.ejs', {
                        User: req.session.User,
                        Data: data
                    });
                }
            })
        }
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/CREATE', (req, res) => {
    try {
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
    } catch (e) {
        res.status(404).send(e);
    }
});
router.post('/CREATE', upload.array('Storage', 10), (req, res, next) => {
    try {
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
    } catch (e) {
        res.status(404).send(e);
    }
});
router.get('/UPDATE', (req, res) => {
    try {
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
    } catch (e) {
        res.status(404).send(e);
    }
});
router.post('/UPDATE', (req, res) => {
    try {
        if (req.session.User == undefined || req.session.isAuth == false) {
            res.redirect("/user/login");
        } else {
            UpdateKH([req.body.para1, req.body.para2, req.body.para3, req.body.para4, req.body.para5, req.body.para6, req.body.para7, req.body.para0]).then((result) => {
                res.redirect("/KH");
            })
        }
    } catch (e) {
        res.status(404).send(e);
    }
});
router.get('/DETAIL', (req, res) => {
    try {
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
    } catch (e) {
        res.status(404).send(e);
    }
});
router.get('/DELETE', (req, res) => {
    try {
        if (req.session.User == undefined || req.session.isAuth == false) {
            res.redirect("/user/login");
        } else {
            DeleteKH(req.query.id).then((result) => {
                res.redirect("/KH");
            })
        }
    } catch (e) {
        res.status(404).send(e);
    }
});
module.exports = router;