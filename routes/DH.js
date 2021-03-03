const express = require('express');
const router = express.Router();
const { SelectALLDH, SelectALL, CreateMaHD, InsertDH, SelectByIDFromDH, UpdateDH, UpdateStatusDH, DeleteDH, SelectByIDFromXB } = require('../model/CRUD');
const { TramXuat, TramXuat2 } = require('../model/utilis');

express().set('view engine', 'ejs');
router.get('/', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        SelectALLDH().then((result) => {
            result.forEach(e => {
                e.datecreate = new Date(e.datecreate).toLocaleString();
            })
            res.render('../views/pages/table.ejs', {
                User: req.session.User,
                Data: result
            });
        })
    }
});
//Truy cap trang tao don hang
router.get("/CREATE", (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        var KH, XE, TX;
        if (req.query.date) {
            var time = new Date(req.query.date);
        } else {
            var time = null;
        }
        SelectALL("khachhang", (err, data) => {
            if (!err) {
                KH = data;
                SelectALL("taixe", (err, data) => {
                    if (!err) {
                        TX = data;
                        SelectALL("xebon", (err, data) => {
                            if (!err) {
                                XE = data;
                                res.render('../views/pages/form.ejs', {
                                    User: req.session.User,
                                    Data: [{
                                        id: null,
                                        maHD: null,
                                        datecreate: time,
                                        tyopHD: null,
                                        kh: null,
                                        ctyvantaiHD: null,
                                        taixe: null,
                                        xe: null,
                                        tramxuat: null,
                                        khoiluong: null,
                                        donvi: null,
                                        thanhtoan: null,
                                        trangthai: null,
                                        nguoitao: null,
                                        nguoiduyet: null,
                                        ghichu: null
                                    }],
                                    KH: KH,
                                    XE: XE,
                                    TX: TX,
                                    message: "CREATE"
                                })
                            }
                        })
                    }
                })
            }
        })
    }
});
//Insert DH moi vao database
router.post("/CREATE", (req, res) => {
    CreateMaHD().then((result) => {
        var maHD = result;
        if (req.body.para2) {
            var datecreate = new Date(req.body.para2);
        } else {
            var datecreate = new Date();
        }
        var typeHD = req.body.para3;
        var kh = req.body.para4;
        var tramxuat = req.body.para5;
        var ctyvantaiHD = req.body.para6;
        var taixe = req.body.para7;
        var xe = req.body.para8;
        var khoiluong = req.body.para9;
        var donvi = req.body.para10;
        var thanhtoan = req.body.para11;
        var ghichu = req.body.para12;
        var trangthai = "Đã duyệt";
        var nguoitao = req.session.User.User;
        var dh = {
            maHD: maHD,
            datecreate: datecreate,
            tyopHD: typeHD,
            kh: kh,
            ctyvantaiHD: ctyvantaiHD,
            taixe: taixe,
            xe: xe,
            tramxuat: tramxuat,
            khoiluong: khoiluong,
            donvi: donvi,
            thanhtoan: thanhtoan,
            trangthai: trangthai,
            nguoitao: nguoitao,
            nguoiduyet: "",
            ghichu: ghichu,
        };
        InsertDH(dh).then((result) => {
            res.redirect("/dashboard")
        })
    })
});

router.get('/UPDATE', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        var id = req.query.id;
        SelectALL("khachhang", (err, data) => {
            if (!err) {
                KH = data;
                SelectALL("taixe", (err, data) => {
                    if (!err) {
                        TX = data;
                        SelectALL("xebon", (err, data) => {
                            if (!err) {
                                XE = data;
                                SelectByIDFromDH(id).then((result) => {
                                    var DH = result;
                                    res.render('../views/pages/form.ejs', {
                                        User: req.session.User,
                                        Data: DH,
                                        KH: KH,
                                        XE: XE,
                                        TX: TX,
                                        message: "UPDATE"
                                    })
                                }).catch((err) => {
                                    res.redirect("/dashboard")
                                })
                            }
                        })
                    }
                })
            }
        })
    }
});
router.post('/UPDATE', (req, res) => {
    var id = req.body.para0;
    var typeHD = req.body.para3;
    var kh = req.body.para4;
    var ctyvantaiHD = req.body.para6;
    var taixe = req.body.para7;
    var xe = req.body.para8;
    var tramxuat = req.body.para5;
    var khoiluong = req.body.para9;
    var donvi = req.body.para10;
    var thanhtoan = req.body.para11;
    var ghichu = req.body.para12;
    UpdateDH([typeHD, kh, ctyvantaiHD, taixe, xe, tramxuat, khoiluong, donvi, thanhtoan, ghichu, id]).then((result) => {
        res.redirect("/DH")
    })
});
router.get('/DETAIL', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        if (req.session.User.Position == "Kinh Doanh") {
            res.redirect("/DH/UPDATE?id=" + req.query.id)
        } else {
            var id = req.query.id;
            SelectALL("khachhang", (err, data) => {
                if (!err) {
                    KH = data;
                    SelectALL("taixe", (err, data) => {
                        if (!err) {
                            TX = data;
                            SelectALL("xebon", (err, data) => {
                                if (!err) {
                                    XE = data;
                                    SelectByIDFromDH(id).then((result) => {
                                        var DH = result;
                                        res.render('../views/pages/form.ejs', {
                                            User: req.session.User,
                                            Data: DH,
                                            KH: KH,
                                            XE: XE,
                                            TX: TX,
                                            message: "DETAIL"
                                        })
                                    }).catch((err) => {
                                        res.redirect("/dashboard")
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    }
});
router.post('/DETAIL', async(req, res) => {
    if (req.body.para13 == "Đang Xuất") {
        res.render('../views/pages/404.ejs', {
            User: req.session.User,
            message: "Xe đang xuất hoặc chuẩn bị xuất"
        })
    }
    SelectByIDFromXB(req.body.para8, (err, data) => {
        if (err) {

        } else {
            if (req.body.para5 == "Trạm 1") {
                var node = {
                    nodeId1: "ns=4;s=MAIN.Test1.MaDonHang",
                    nodeValue1: req.body.para1,
                    nodeId2: "ns=4;s=MAIN.Test1.BienSo",
                    nodeValue2: data[0].bienso,
                    nodeId3: "ns=4;s=MAIN.Test1.KhoiLuong",
                    nodeValue3: req.body.para9,
                    nodeId4: "ns=4;s=MAIN.Test1.DonVi",
                    nodeValue4: req.body.para10
                };
                var status = TramXuat2(node);
                if (status) {
                    UpdateStatusDH([req.body.para5, "Đang Xuất", req.body.para1]).then((result) => {
                        res.redirect("/DH")
                    })
                } else {
                    res.render('../views/pages/404.ejs', {
                        User: req.session.User,
                        message: "Lỗi ghi dữ liệu xuống PLC"
                    })
                }
            };
            if (req.body.para5 == "Trạm 2") {
                var node = {
                    nodeId1: "ns=4;s=MAIN.Test2.MaDonHang",
                    nodeValue1: req.body.para1,
                    nodeId2: "ns=4;s=MAIN.Test2.BienSo",
                    nodeValue2: data[0].bienso,
                    nodeId3: "ns=4;s=MAIN.Test2.KhoiLuong",
                    nodeValue3: req.body.para9,
                    nodeId4: "ns=4;s=MAIN.Test2.DonVi",
                    nodeValue4: req.body.para10,
                }
                var status = TramXuat2(node);
                if (status) {
                    UpdateStatusDH([req.body.para5, "Đang Xuất", req.body.para1]).then((result) => {
                        res.redirect("/DH")
                    }).catch(err => {
                        if (req.body.para13 == "Đang Xuất") {
                            res.render('../views/pages/404.ejs', {
                                User: req.session.User,
                                message: "Xe đang xuất hoặc chuẩn bị xuất"
                            })
                        } else {
                            res.render('../views/pages/404.ejs', {
                                User: req.session.User,
                                message: "xem lại trạm xuất"
                            })
                        }
                    })
                } else {
                    res.render('../views/pages/404.ejs', {
                        User: req.session.User,
                        message: "Lỗi ghi dữ liệu xuống PLC"
                    })
                }
            }
        }
    })
});

router.get('/DELETE', (req, res) => {
    DeleteDH(req.query.id).then((result) => {
        res.redirect("/DH");
        //GHI DU LIEU XUONG PLC
    })
});
module.exports = router;