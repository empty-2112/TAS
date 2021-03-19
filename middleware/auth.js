var jwt = require('jsonwebtoken');
const { findOne } = require('../model/CRUD');

const auth = async(req, res, next) => {
    try {
        if (req.session.isAuth) {
            const token = req.header.Token;
            const decoded = jwt.verify(token, 'NKEnginnering!17032021@#$HoaKhanh');
            let user;
            findOne(decoded.tentk).then(result => {
                if (result.length < 1) {
                    user = [false, undefined];
                } else {
                    user = [true, result[0]];
                }
            }).catch(err => {
                user = [false, undefined];
            });
            next();
        } else {
            res.redirect("/user/login");
        }
    } catch (err) {
        console.log(err);
        res.redirect("/user/login");
    }
}

module.exports = auth