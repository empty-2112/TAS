const { render } = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { SelectByUserNameFromTK } = require('../model/CRUD');
var jwt = require('jsonwebtoken');

const router = express.Router();
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

router.get("/login", (req, res) => {
    res.render("pages/login")
})
router.post("/login", (req, res) => {
    SelectByUserNameFromTK(req.body.Username, (err, data) => {
        if (err) {

        } else {
            bcrypt.compare(req.body.Password, data[0].matkhautk).then((result) => {
                if (result) {
                    req.header.Token = jwt.sign({ tentk: data[0].tentk, id: data[0].id, token: "Checked" }, "NKEnginnering!17032021@#$HoaKhanh");
                    req.session.User = {
                        User: data[0].tentk,
                        Position: data[0].vitritk
                    };
                    req.session.isAuth = true;
                    res.redirect("/dashboard")
                } else {
                    res.render("pages/login", { message: "Mật khẩu hoặc tên đăng nhập không đúng" })
                }
            })
        }
    })
})

router.get("/logout", (req, res) => {
    req.header.Token = "";
    req.session.destroy((err) => {
        res.render("pages/login")
    });
})
module.exports = router;