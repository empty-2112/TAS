const express = require('express');
const multer = require('multer');
const router = express.Router();
const { SelectALL, InsertXB, SelectByIDFromXB, UpdateXB, DeleteXB } = require('../model/CRUD');

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
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectALL("XEBON", (err, data) => {
            if (err) {
                res.render('../views/pages/xebon.ejs', {
                    User: req.session.User,
                    Data: null
                });
            } else {
                data.forEach(element => {
                    var time1 = new Date(element.ngayhetvn);
                    var time2 = new Date(element.ngayhetvt);
                    var ngayhetvn = time1.getDate() + "-" + Number(time1.getMonth() + 1) + "-" + time1.getFullYear();
                    var ngayhetvt = time2.getDate() + "-" + Number(time2.getMonth() + 1) + "-" + time2.getFullYear();
                    element.ngayhetvn = ngayhetvn;
                    element.ngayhetvt = ngayhetvt;
                });
                res.render('../views/pages/xebon.ejs', {
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
        res.render('../views/pages/form-xebon.ejs', {
            User: req.session.User,
            Data: [{
                id: null,
                bienso: null,
                taitrong: null,
                chuxe: null,
                giaycn: null,
                ngayhetvn: null,
                giayphepvt: null,
                ngayhetvt: null,
                sokhung: null,
                note: null,
            }],
            message: "CREATE"
        })
    }
});
router.post('/CREATE', upload.array('Storage', 10), (req, res, next) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        let ngayhetvn, ngayhetvt;
        if (req.body.para9 == '') {
            ngayhetvn = null;
        } else {
            ngayhetvn = req.body.para9;
        }
        if (req.body.para7 == '') {
            ngayhetvt = null;
        } else {
            ngayhetvt = req.body.para7;
        }
        let bienso = req.body.para1;
        let taitrong = req.body.para2;
        let chuxe = req.body.para3;
        let giaycn = req.body.para5;
        let giayphepvt = req.body.para6;
        let sokhung = req.body.para4;
        let note = req.body.para8;
        InsertXB({
            bienso: bienso,
            taitrong: taitrong,
            chuxe: chuxe,
            giaycn: giaycn,
            ngayhetvn: ngayhetvn,
            giayphepvt: giayphepvt,
            ngayhetvt: ngayhetvt,
            sokhung: sokhung,
            note: note,
        }).then((result) => {
            res.redirect("/XB");
        })
    }
});
router.get('/UPDATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectByIDFromXB(req.query.id, (err, data) => {
            if (err) {

            } else {
                var time1 = new Date(data[0].ngayhetvn);
                var time2 = new Date(data[0].ngayhetvt);
                if (Number(time1.getMonth() + 1) < 10) {
                    data[0].ngayhetvn = time1.getFullYear() + "-" + "0" + Number(time1.getMonth() + 1);
                } else {
                    data[0].ngayhetvn = time1.getFullYear() + "-" + Number(time1.getMonth() + 1);
                }
                if (Number(time1.getDate()) < 10) {
                    data[0].ngayhetvn = data[0].ngayhetvn + "-" + "0" + time1.getDate();
                } else {
                    data[0].ngayhetvn = data[0].ngayhetvn + "-" + time1.getDate();
                }
                //
                if (Number(time2.getMonth() + 1) < 10) {
                    data[0].ngayhetvt = time2.getFullYear() + "-" + "0" + Number(time2.getMonth() + 1);
                } else {
                    data[0].ngayhetvt = time2.getFullYear() + "-" + Number(time2.getMonth() + 1);
                }
                if (Number(time2.getDate()) < 10) {
                    data[0].ngayhetvt = data[0].ngayhetvt + "-" + "0" + time2.getDate();
                } else {
                    data[0].ngayhetvt = data[0].ngayhetvt + "-" + time2.getDate();
                }
                //
                res.render('../views/pages/form-xebon.ejs', {
                    User: req.session.User,
                    Data: data,
                    message: "UPDATE"
                })
            }
        })
    }
});
router.post('/UPDATE', (req, res) => {
    UpdateXB([req.body.para1, req.body.para2, req.body.para3, req.body.para5, req.body.para9, req.body.para6, req.body.para7, req.body.para4, req.body.para8, req.body.para0]).then((result) => {
        res.redirect("/XB");
    })
});
router.get('/DETAIL', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectByIDFromXB(req.query.id, (err, data) => {
            if (err) {

            } else {
                var time1 = new Date(data[0].ngayhetvn);
                var time2 = new Date(data[0].ngayhetvt);
                if (Number(time1.getMonth() + 1) < 10) {
                    data[0].ngayhetvn = time1.getFullYear() + "-" + "0" + Number(time1.getMonth() + 1);
                } else {
                    data[0].ngayhetvn = time1.getFullYear() + "-" + Number(time1.getMonth() + 1);
                }
                if (Number(time1.getDate()) < 10) {
                    data[0].ngayhetvn = data[0].ngayhetvn + "-" + "0" + time1.getDate();
                } else {
                    data[0].ngayhetvn = data[0].ngayhetvn + "-" + time1.getDate();
                }
                //
                if (Number(time2.getMonth() + 1) < 10) {
                    data[0].ngayhetvt = time2.getFullYear() + "-" + "0" + Number(time2.getMonth() + 1);
                } else {
                    data[0].ngayhetvt = time2.getFullYear() + "-" + Number(time2.getMonth() + 1);
                }
                if (Number(time2.getDate()) < 10) {
                    data[0].ngayhetvt = data[0].ngayhetvt + "-" + "0" + time2.getDate();
                } else {
                    data[0].ngayhetvt = data[0].ngayhetvt + "-" + time2.getDate();
                }
                //
                res.render('../views/pages/form-xebon.ejs', {
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
        DeleteXB(req.query.id).then((result) => {
            res.redirect("/XB");
        })
    }
});
module.exports = router;