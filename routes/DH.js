const express = require('express');
const router = express.Router();
const { SelectALLDH, SelectALL, CreateMaHD, InsertDH, SelectByIDFromDH, UpdateDH, UpdateStatusDH, DeleteDH, SelectByIDFromXB, CheckDH, UpdateStatusDH2 } = require('../model/CRUD');
const { TramXuat, ScanHangDoi } = require('../model/utilis');
const { TramXuat2, main } = require('../model/WriteToPLC');
express().set('view engine', 'ejs');
router.get('/', (req, res) => {
    try {
        if (req.session.User == undefined || req.session.isAuth == false) {
            res.redirect("/user/login");
        } else {
            SelectALLDH().then((result) => {
                result.forEach(e => {
                    e.datecreate = new Date(e.datecreate).toLocaleString();
                })
                res.render('../views/pages/table.ejs', {
                    User: req.session.User,
                    Data: result,
                    StatusPLC: null
                });
            }).catch(err => {
                res.render('../views/pages/table.ejs', {
                    User: req.session.User,
                    Data: null,
                    StatusPLC: null
                });
            })
        }
    } catch (e) {
        res.status(400).send(e);
    }

});
//Truy cap trang tao don hang
router.get("/CREATE", (req, res) => {
    try {
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
                                            typeHD: null,
                                            ctyvantaiHD: null,
                                            kh: null,
                                            taixe: null,
                                            xe: null,
                                            ngan1: null,
                                            khoiluong1: null,
                                            ngan2: null,
                                            khoiluong2: null,
                                            ngan3: null,
                                            khoiluong3: null,
                                            ngan4: null,
                                            khoiluong4: null,
                                            ngan5: null,
                                            khoiluong5: null,
                                            ngan6: null,
                                            khoiluong6: null,
                                            ngan7: null,
                                            khoiluong7: null,
                                            ngan8: null,
                                            khoiluong8: null,
                                            ngan9: null,
                                            khoiluong9: null,
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
                } else {
                    KH = null;
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
                                            typeHD: null,
                                            ctyvantaiHD: null,
                                            kh: null,
                                            taixe: null,
                                            xe: null,
                                            ngan1: null,
                                            khoiluong1: null,
                                            ngan2: null,
                                            khoiluong2: null,
                                            ngan3: null,
                                            khoiluong3: null,
                                            ngan4: null,
                                            khoiluong4: null,
                                            ngan5: null,
                                            khoiluong5: null,
                                            ngan6: null,
                                            khoiluong6: null,
                                            ngan7: null,
                                            khoiluong7: null,
                                            ngan8: null,
                                            khoiluong8: null,
                                            ngan9: null,
                                            khoiluong9: null,
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
                                } else {
                                    XE = null;
                                    res.render('../views/pages/form.ejs', {
                                        User: req.session.User,
                                        Data: [{
                                            id: null,
                                            maHD: null,
                                            datecreate: time,
                                            typeHD: null,
                                            ctyvantaiHD: null,
                                            kh: null,
                                            taixe: null,
                                            xe: null,
                                            ngan1: null,
                                            khoiluong1: null,
                                            ngan2: null,
                                            khoiluong2: null,
                                            ngan3: null,
                                            khoiluong3: null,
                                            ngan4: null,
                                            khoiluong4: null,
                                            ngan5: null,
                                            khoiluong5: null,
                                            ngan6: null,
                                            khoiluong6: null,
                                            ngan7: null,
                                            khoiluong7: null,
                                            ngan8: null,
                                            khoiluong8: null,
                                            ngan9: null,
                                            khoiluong9: null,
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
                        } else {
                            TX = null;
                            SelectALL("xebon", (err, data) => {
                                if (!err) {
                                    XE = data;
                                    res.render('../views/pages/form.ejs', {
                                        User: req.session.User,
                                        Data: [{
                                            id: null,
                                            maHD: null,
                                            datecreate: time,
                                            typeHD: null,
                                            ctyvantaiHD: null,
                                            kh: null,
                                            taixe: null,
                                            xe: null,
                                            ngan1: null,
                                            khoiluong1: null,
                                            ngan2: null,
                                            khoiluong2: null,
                                            ngan3: null,
                                            khoiluong3: null,
                                            ngan4: null,
                                            khoiluong4: null,
                                            ngan5: null,
                                            khoiluong5: null,
                                            ngan6: null,
                                            khoiluong6: null,
                                            ngan7: null,
                                            khoiluong7: null,
                                            ngan8: null,
                                            khoiluong8: null,
                                            ngan9: null,
                                            khoiluong9: null,
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
                                } else {
                                    XE = null;
                                    res.render('../views/pages/form.ejs', {
                                        User: req.session.User,
                                        Data: [{
                                            id: null,
                                            maHD: null,
                                            datecreate: time,
                                            typeHD: null,
                                            ctyvantaiHD: null,
                                            kh: null,
                                            taixe: null,
                                            xe: null,
                                            ngan1: null,
                                            khoiluong1: null,
                                            ngan2: null,
                                            khoiluong2: null,
                                            ngan3: null,
                                            khoiluong3: null,
                                            ngan4: null,
                                            khoiluong4: null,
                                            ngan5: null,
                                            khoiluong5: null,
                                            ngan6: null,
                                            khoiluong6: null,
                                            ngan7: null,
                                            khoiluong7: null,
                                            ngan8: null,
                                            khoiluong8: null,
                                            ngan9: null,
                                            khoiluong9: null,
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
    } catch (e) {
        res.status(400).send(e);
    }

});
//Insert DH moi vao database
router.post("/CREATE", (req, res) => {
    try {
        CreateMaHD().then((result) => {
            var maHD = result;
            if (req.body.para2) {
                var datecreate = new Date(req.body.para2);
            } else {
                var datecreate = new Date();
            }
            var typeHD = req.body.para3;
            var ctyvantaiHD = req.body.para6;
            var kh = req.body.para4;
            var taixe = req.body.para7;
            var xe = req.body.para8;
            var ngan1 = req.body.sp1;
            var ngan2 = req.body.sp2;
            var ngan3 = req.body.sp3;
            var ngan4 = req.body.sp4;
            var ngan5 = req.body.sp5;
            var ngan6 = req.body.sp6;
            var ngan7 = req.body.sp7;
            var ngan8 = req.body.sp8;
            var ngan9 = req.body.sp9;
            var khoiluong1 = req.body.kl1;
            var khoiluong2 = req.body.kl2;
            var khoiluong3 = req.body.kl3;
            var khoiluong4 = req.body.kl4;
            var khoiluong5 = req.body.kl5;
            var khoiluong6 = req.body.kl6;
            var khoiluong7 = req.body.kl7;
            var khoiluong8 = req.body.kl8;
            var khoiluong9 = req.body.kl9;
            var thanhtoan = req.body.para11;
            var ghichu = req.body.para12;
            var trangthai = "Đang chờ duyệt";
            var nguoitao = req.session.User.User;
            var dh = {
                maHD: maHD,
                datecreate: datecreate,
                typeHD: typeHD,
                ctyvantaiHD: ctyvantaiHD,
                kh: kh,
                taixe: taixe,
                xe: xe,
                ngan1: ngan1,
                khoiluong1: khoiluong1,
                ngan2: ngan2,
                khoiluong2: khoiluong2,
                ngan3: ngan3,
                khoiluong3: khoiluong3,
                ngan4: ngan4,
                khoiluong4: khoiluong4,
                ngan5: ngan5,
                khoiluong5: khoiluong5,
                ngan6: ngan6,
                khoiluong6: khoiluong6,
                ngan7: ngan7,
                khoiluong7: khoiluong7,
                ngan8: ngan8,
                khoiluong8: khoiluong8,
                ngan9: ngan9,
                khoiluong9: khoiluong9,
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
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/UPDATE', (req, res) => {
    try {
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
    } catch (e) {
        res.status(400).send(e);
    }

});
router.post('/UPDATE', (req, res) => {
    try {
        var id = req.body.para0;
        var typeHD = req.body.para3;
        var ctyvantaiHD = req.body.para6;
        var kh = req.body.para4;
        var taixe = req.body.para7;
        var xe = req.body.para8;
        var ngan1 = req.body.sp1;
        var ngan2 = req.body.sp2;
        var ngan3 = req.body.sp3;
        var ngan4 = req.body.sp4;
        var ngan5 = req.body.sp5;
        var ngan6 = req.body.sp6;
        var ngan7 = req.body.sp7;
        var ngan8 = req.body.sp8;
        var ngan9 = req.body.sp9;
        var khoiluong1 = req.body.kl1;
        var khoiluong2 = req.body.kl2;
        var khoiluong3 = req.body.kl3;
        var khoiluong4 = req.body.kl4;
        var khoiluong5 = req.body.kl5;
        var khoiluong6 = req.body.kl6;
        var khoiluong7 = req.body.kl7;
        var khoiluong8 = req.body.kl8;
        var khoiluong9 = req.body.kl9;
        var thanhtoan = req.body.para11;
        var ghichu = req.body.para12;
        UpdateDH([typeHD, ctyvantaiHD, kh, taixe, xe, ngan1, khoiluong1, ngan2, khoiluong2, ngan3, khoiluong3, ngan4, khoiluong4, ngan5, khoiluong5, ngan6, khoiluong6, ngan7, khoiluong7, ngan8, khoiluong8, ngan9, khoiluong9, thanhtoan, ghichu, id]).then((result) => {
            res.redirect("/DH")
        })
    } catch (e) {
        res.status(400).send(e);
    }

});
router.get('/DETAIL', (req, res) => {
    try {
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
    } catch (e) {
        res.status(400).send(e);
    }

});
router.post('/DETAIL', async(req, res) => {
    try {
        if (req.body.para13 == "Đang Xuất") {
            res.render('../views/pages/404.ejs', {
                User: req.session.User,
                message: "Xe đang xuất hoặc chuẩn bị xuất"
            })
        }
        ScanHangDoi().then(result => {
            if (result == -1) {
                SelectALLDH().then((result) => {
                    result.forEach(e => {
                        e.datecreate = new Date(e.datecreate).toLocaleString();
                    })
                    res.render('../views/pages/table.ejs', {
                        User: req.session.User,
                        Data: result,
                        StatusPLC: "Hàng đợi của PLC đã đầy!!!"
                    });
                }).catch(err => {
                    res.render('../views/pages/table.ejs', {
                        User: req.session.User,
                        Data: null,
                    });
                })
            }
            if (result == -2) {
                console.log("ScanHangDoi");
                SelectALLDH().then((result) => {
                    result.forEach(e => {
                        e.datecreate = new Date(e.datecreate).toLocaleString();
                    })
                    res.render('../views/pages/table.ejs', {
                        User: req.session.User,
                        Data: result,
                        StatusPLC: "Lỗi không thể ghi xuống PLC được!"
                    });
                }).catch(err => {
                    res.render('../views/pages/table.ejs', {
                        User: req.session.User,
                        Data: null,
                    });
                })
            }
            if (result != -2 && result != -1) {
                var stt = result;
                console.log("Hàng đợi số " + stt + " đang null");
                SelectByIDFromDH(req.body.para0).then(data => {
                    main(stt, data[0]).then(result => {
                        if (result) {

                            UpdateStatusDH2(["Đang xuất", req.body.para0]).then(data3 => {
                                SelectALLDH().then((result) => {
                                    result.forEach(e => {
                                        e.datecreate = new Date(e.datecreate).toLocaleString();
                                    })
                                    res.render('../views/pages/table.ejs', {
                                        User: req.session.User,
                                        Data: result,
                                        StatusPLC: "Ghi Xuống PLC Thành Công"
                                    });
                                }).catch(err => {
                                    res.render('../views/pages/table.ejs', {
                                        User: req.session.User,
                                        Data: null,
                                    });
                                })
                            }).catch(err => {

                            })

                        } else {
                            console.log("MAIN false");
                        }
                    }).catch(e => {
                        console.log("ERROR main");
                        SelectALLDH().then((result) => {
                            result.forEach(e => {
                                e.datecreate = new Date(e.datecreate).toLocaleString();
                            })
                            res.render('../views/pages/table.ejs', {
                                User: req.session.User,
                                Data: result,
                                StatusPLC: "Lỗi không thể ghi xuống PLC được!"
                            });
                        }).catch(err => {
                            res.render('../views/pages/table.ejs', {
                                User: req.session.User,
                                Data: null,
                            });
                        })
                    })
                }).catch(err => {
                    console.log("SelectByIDFromDH" + err);
                });
            }
        })
    } catch (e) {
        res.status(400).send(e)
    }

});

router.get('/DELETE', (req, res) => {
    try {
        DeleteDH(req.query.id).then((result) => {
            res.redirect("/DH");
        })
    } catch (e) {
        res.status(400).send(e)
    }

});
router.get('/CHECK', (req, res) => {
    try {
        CheckDH(req.query.id).then((result) => {
            res.redirect("/DH");
            //GHI DU LIEU XUONG PLC
        }).catch(err => {
            console.log(err);
            res.redirect("/DH");
        })
    } catch (e) {
        res.status(400).send(e)
    }
});
module.exports = router;