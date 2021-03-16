const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { SelectALL, SelectByIDFromTK, UpdateTK, DeleteTK, SelectByUserNameFromTK, UpdatePassword } = require('../model/CRUD');

express().set('view engine', 'ejs');
router.get('/', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectALL("TAIKHOAN", (err, data) => {
            if (err) {

            } else {
                res.render('../views/pages/taikhoan.ejs', {
                    User: req.session.User,
                    Data: data,
                    Data1: [{
                        id: null,
                        tentk: null,
                        emailtk: null,
                        matkhautk: null,
                        vitritk: null,
                        note: null
                    }],
                    message: "CREATE"
                });
            }
        })
    }
});
router.get('/UPDATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectALL("TAIKHOAN", (err, data) => {
            if (err) {

            } else {

                SelectByIDFromTK(req.query.id, (err, result) => {
                    if (err) {

                    } else {
                        res.render('../views/pages/taikhoan.ejs', {
                            User: req.session.User,
                            Data: data,
                            Data1: result,
                            message: "UPDATE"
                        });
                    }

                })
            }
        })
    }
});
router.post('/UPDATE', (req, res) => {


    UpdateTK([req.body.para1, req.body.para2, req.body.para4, req.body.para5, req.body.para0]).then((result) => {
        res.redirect("/TK")
    })
});

router.get('/DELETE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        DeleteTK(req.query.id).then((result) => {
            res.redirect("/TK")
        })
    }
});

router.get('/SETTING', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        res.render('../views/pages/setting.ejs', {
            User: req.session.User,
            message: "SETTING",
            Error: null
        });
    }
});
router.post('/SETTING', (req, res) => {
    let oldpassword = (req.body.para2).toString();
    let newpassword = (req.body.para3).toString();
    let confirmpassword = (req.body.para4).toString();
    if (newpassword === confirmpassword) {
        SelectByUserNameFromTK(req.body.para1, (err, data) => {
            if (err) {
                res.render('../views/pages/setting.ejs', {
                    User: req.session.User,
                    message: "SETTING",
                    Error: "Lỗi truy cập dữ liệu"
                });
            } else {
                bcrypt.compare(oldpassword, data[0].matkhautk).then((result) => {
                    if (result) {
                        //True
                        bcrypt.hash(newpassword, 10).then(data2 => {
                            UpdatePassword(data2, data[0].id).then(result => {
                                //Success
                                res.redirect("/user/logout");
                            }).catch(err => {
                                res.render('../views/pages/setting.ejs', {
                                    User: req.session.User,
                                    message: "SETTING",
                                    Error: "Lỗi thay đổi dữ liệu"
                                });
                            })
                        })
                    } else {
                        //False
                        res.render('../views/pages/setting.ejs', {
                            User: req.session.User,
                            message: "SETTING",
                            Error: "Mật khẩu củ không đúng"
                        });
                    }
                })
            }
        })
    } else {
        res.render('../views/pages/setting.ejs', {
            User: req.session.User,
            message: "SETTING",
            Error: "Mật khẩu mới không giống nhau"
        });
    }
});
module.exports = router;