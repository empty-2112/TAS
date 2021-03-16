const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const app = express();
const publicDirectoryPath = path.join(__dirname);
const { SelectALL, InsertTX, SelectByIDFromTX, DeleteTX, UpdateTX } = require('../model/CRUD');

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
        SelectALL("taixe", (err, data) => {
            if (err) {
                res.render('../views/pages/taixe.ejs', {
                    User: req.session.User,
                    Data: null
                });
            } else {
                data.forEach(element => {
                    var time1 = new Date(element.ngaysinh);
                    var time2 = new Date(element.ngaysinh);
                    var time3 = new Date(element.ngaysinh);
                    var ngaysinh = time1.getDate() + "-" + Number(time1.getMonth() + 1) + "-" + time1.getFullYear();
                    var ngaycap = time2.getDate() + "-" + Number(time2.getMonth() + 1) + "-" + time2.getFullYear();
                    var ngayhet = time3.getDate() + "-" + Number(time3.getMonth() + 1) + "-" + time3.getFullYear();
                    element.ngaysinh = ngaysinh;
                    element.ngaycap = ngaycap;
                    element.ngayhet = ngayhet;
                });
                res.render('../views/pages/taixe.ejs', {
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
        res.render('../views/pages/form-taixe.ejs', {
            User: req.session.User,
            Data: [{
                tenTX: null,
                ngaysinh: null,
                cmnd: null,
                ngaycap: null,
                banglai: null,
                ngayhet: null,
                note: null
            }],
            message: "CREATE"
        })
    }
});
router.post('/CREATE', upload.array('Storage', 10), (req, res, next) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        let ngaysinh, ngaycap, ngayhet;

        if (req.body.para2 == '') {
            ngaysinh = null;
        } else {
            ngaysinh = req.body.para2;
        }
        if (req.body.para4 == '') {
            ngaycap = null;
        } else {
            ngaycap = req.body.para4;
        }
        if (req.body.para6 == '') {
            ngayhet = null;
        } else {
            ngayhet = req.body.para6;
        }
        let tenTX = req.body.para1;
        let cmnd = req.body.para3;
        let banglai = req.body.para5;
        let note = req.body.para8;
        InsertTX({
            tenTX: tenTX,
            ngaysinh: ngaysinh,
            cmnd: cmnd,
            ngaycap: ngaycap,
            banglai: banglai,
            ngayhet: ngayhet,
            note: note
        }).then((result) => {
            res.redirect("/TX");
        });
    }
});
router.get('/UPDATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectByIDFromTX(req.query.id, (err, data) => {
            if (err) {

            } else {
                var time1 = new Date(data[0].ngaysinh);
                var time2 = new Date(data[0].ngaycap);
                var time3 = new Date(data[0].ngayhet);
                if (Number(time1.getMonth() + 1) < 10) {
                    data[0].ngaysinh = time1.getFullYear() + "-" + "0" + Number(time1.getMonth() + 1);
                } else {
                    data[0].ngaysinh = time1.getFullYear() + "-" + Number(time1.getMonth() + 1);
                }
                if (Number(time1.getDate()) < 10) {
                    data[0].ngaysinh = data[0].ngaysinh + "-" + "0" + time1.getDate();
                } else {
                    data[0].ngaysinh = data[0].ngaysinh + "-" + time1.getDate();
                }
                //
                if (Number(time2.getMonth() + 1) < 10) {
                    data[0].ngaycap = time2.getFullYear() + "-" + "0" + Number(time2.getMonth() + 1);
                } else {
                    data[0].ngaycap = time2.getFullYear() + "-" + Number(time2.getMonth() + 1);
                }
                if (Number(time2.getDate()) < 10) {
                    data[0].ngaycap = data[0].ngaycap + "-" + "0" + time2.getDate();
                } else {
                    data[0].ngaycap = data[0].ngaycap + "-" + time2.getDate();
                }
                //
                if (Number(time3.getMonth() + 1) < 10) {
                    data[0].ngayhet = time3.getFullYear() + "-" + "0" + Number(time3.getMonth() + 1);
                } else {
                    data[0].ngayhet = time3.getFullYear() + "-" + Number(time3.getMonth() + 1);
                }
                if (Number(time3.getDate()) < 10) {
                    data[0].ngayhet = data[0].ngayhet + "-" + "0" + time3.getDate();
                } else {
                    data[0].ngayhet = data[0].ngayhet + "-" + time3.getDate();
                }
                //
                res.render('../views/pages/form-taixe.ejs', {
                    User: req.session.User,
                    Data: data,
                    message: "UPDATE"
                })
            }
        })
    }
});
router.post('/UPDATE', (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            console.log("Error uploading file.");
        }
        console.log("File is uploaded successfully!");
    });
    UpdateTX([req.body.para1, req.body.para2, req.body.para3, req.body.para4, req.body.para5, req.body.para6, req.body.para8, req.body.para0]).then((result) => {
        res.redirect("/TX");
    })
});
router.get('/DETAIL', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectByIDFromTX(req.query.id, (err, data) => {
            if (err) {

            } else {
                var time1 = new Date(data[0].ngaysinh);
                var time2 = new Date(data[0].ngaycap);
                var time3 = new Date(data[0].ngayhet);
                if (Number(time1.getMonth() + 1) < 10) {
                    data[0].ngaysinh = time1.getFullYear() + "-" + "0" + Number(time1.getMonth() + 1);
                } else {
                    data[0].ngaysinh = time1.getFullYear() + "-" + Number(time1.getMonth() + 1);
                }
                if (Number(time1.getDate()) < 10) {
                    data[0].ngaysinh = data[0].ngaysinh + "-" + "0" + time1.getDate();
                } else {
                    data[0].ngaysinh = data[0].ngaysinh + "-" + time1.getDate();
                }
                //
                if (Number(time2.getMonth() + 1) < 10) {
                    data[0].ngaycap = time2.getFullYear() + "-" + "0" + Number(time2.getMonth() + 1);
                } else {
                    data[0].ngaycap = time2.getFullYear() + "-" + Number(time2.getMonth() + 1);
                }
                if (Number(time2.getDate()) < 10) {
                    data[0].ngaycap = data[0].ngaycap + "-" + "0" + time2.getDate();
                } else {
                    data[0].ngaycap = data[0].ngaycap + "-" + time2.getDate();
                }
                //
                if (Number(time3.getMonth() + 1) < 10) {
                    data[0].ngayhet = time3.getFullYear() + "-" + "0" + Number(time3.getMonth() + 1);
                } else {
                    data[0].ngayhet = time3.getFullYear() + "-" + Number(time3.getMonth() + 1);
                }
                if (Number(time3.getDate()) < 10) {
                    data[0].ngayhet = data[0].ngayhet + "-" + "0" + time3.getDate();
                } else {
                    data[0].ngayhet = data[0].ngayhet + "-" + time3.getDate();
                }
                //
                res.render('../views/pages/form-taixe.ejs', {
                    User: req.session.User,
                    Data: data,
                    message: "DETAIL"
                })
            }
        })
    }
});

router.get('/DELETE', (req, res) => {
    DeleteTX(req.query.id).then((result) => {
        res.redirect("/TX");
        //GHI DU LIEU XUONG PLC
    })
});
module.exports = router;