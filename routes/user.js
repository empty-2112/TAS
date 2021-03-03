const { render } = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { SelectByUserNameFromTK } = require('../model/CRUD');

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
                    req.session.User = {
                        User: data[0].tentk,
                        Position: data[0].vitritk
                    }
                    res.redirect("/dashboard")
                } else {
                    res.render("pages/login", { message: "Mật khẩu hoặc tên đăng nhập không đúng" })
                }
            })
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.render("pages/login")
    })
})
module.exports = router;