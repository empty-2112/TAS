const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { SelectALL, SelectByIDFromTK, UpdateTK, DeleteTK } = require('../model/CRUD');

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
    console.log(req.body);
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
module.exports = router;