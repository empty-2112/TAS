const mysql = require("mysql");

const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        database: 'hoakhanh',
        port: '3306'
    })
    //Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log(err)
    }
});

const SelectALL = function(para1, callback) {
    let query = 'SELECT * from ??;';
    connection.query(query, [para1], (err, data, fields) => {
        if (err) {
            callback(err.stack, undefined);
        } else {
            if ((data).length == 0) {
                callback("Data Emty", data);
            } else {
                callback(undefined, data);
            }
        }
    })
}

/*
    TABLE TAIKHOAN
    Select by id,tentk
    Update
    Insert
 */
var SelectByUserNameFromTK = (para1, callback) => {
    var query = 'SELECT * from TAIKHOAN Where tentk=?;';
    connection.query(query, [para1], (err, data, fields) => {
        if (err) {
            callback(err.stack, undefined);

        } else {
            if ((data).length == 0) {
                callback("Data Emty", data);

            } else {
                callback(undefined, data);

            }
        }
    })
};
var SelectByIDFromTK = (para1, callback) => {
    var query = 'SELECT * from TAIKHOAN Where id=?;';
    connection.query(query, [para1], (err, data, fields) => {
        if (err) {
            callback(err.stack, undefined);

        } else {
            if ((data).length == 0) {
                callback("Data Emty", data);

            } else {
                callback(undefined, data);

            }
        }
    })
};
var UpdateTK = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'Update TAIKHOAN SET tentk=?,emailtk=?,vitritk=?,note=? where id=?;';
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.changedRows == 0 && data.affectedRows == 1) {
                    reject("Update Fail");

                } else if (data.changedRows == 0 && data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.changedRows == 1 && data.affectedRows == 1) {
                    resolve("Success");

                }
            }
        })
    })
};
var InsertTK = function(para) {
    return new Promise((resolve, reject) => {
        var query = "INSERT INTO TAIKHOAN SET ?;";
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                resolve(data);

            }
        })
    })
};
var DeleteTK = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'DELETE FROM TAIKHOAN WHERE id=?;';
        connection.query(query, [para], (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                if (data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.affectedRows == 1) {
                    resolve(data);

                }
            }
        })
    })
};
/*
    TABLE KHACHHANG
    Select By id
    Update
    Insert
    Delect by id
 */
var SelectByIDFromKH = (para1, callback) => {
    var query = 'SELECT * from KHACHHANG Where id=?;';
    connection.query(query, [para1], (err, data, fields) => {
        if (err) {
            callback(err.stack, undefined);

        } else {
            if ((data).length == 0) {
                callback("Data Emty", data);

            } else {
                callback(undefined, data);

            }
        }
    })
};

var UpdateKH = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'Update KHACHHANG SET tenKH=?,masothue=?,diachi=?,email=?,sdt=?,sofax=?,note=? where id=?;';
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.changedRows == 0 && data.affectedRows == 1) {
                    reject("Update Fail");

                } else if (data.changedRows == 0 && data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.changedRows == 1 && data.affectedRows == 1) {
                    resolve("Success");

                }
            }
        })
    })
};
var InsertKH = function(para) {
    return new Promise((resolve, reject) => {
        var query = "INSERT iNTO KHACHHANG SET ?;";
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                resolve(data);

            }
        })
    })
};
var DeleteKH = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'DELETE FROM KHACHHANG WHERE id=?;';
        connection.query(query, [para], (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                if (data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.affectedRows == 1) {
                    resolve(data);

                }
            }
        })
    })
};
/*
    Type Datetime fomat YYYY-MM-DD
    TABLE TAIXE
    Select By id
    Update para = [value1,value2,...,id]
    Insert para = json {};
 */
var SelectByIDFromTX = (para1, callback) => {
    var query = 'SELECT * from TAIXE Where id=?;';
    connection.query(query, [para1], (err, data, fields) => {
        if (err) {
            callback(err.stack, undefined);

        } else {
            if ((data).length == 0) {
                callback("Data Emty", data);

            } else {
                callback(undefined, data);

            }
        }
    })
};
var UpdateTX = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'Update TAIXE SET tenTX=?,ngaysinh=?,cmnd=?,ngaycap=?,banglai=?,ngayhet=?,note=? where id=?;';
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.changedRows == 0 && data.affectedRows == 1) {
                    reject("Update Fail");

                } else if (data.changedRows == 0 && data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.changedRows == 1 && data.affectedRows == 1) {
                    resolve("Success");

                }
            }
        })
    })
};
var InsertTX = function(para) {
    return new Promise((resolve, reject) => {
        var query = "INSERT INTO TAIXE SET ?;";
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                resolve(data);

            }
        })
    })
};

var DeleteTX = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'DELETE FROM TAIXE WHERE id=?;';
        connection.query(query, [para], (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                if (data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.affectedRows == 1) {
                    resolve(data);

                }
            }
        })
    })
};
/*
    Type Datetime fomat YYYY-MM-DD
    TABLE XEBON
    Select By id
    Update para = [value1,value2,...,id]
    Insert para = json {};
 */
var SelectByIDFromXB = (para1, callback) => {
    var query = 'SELECT * from XEBON Where id=?;';
    connection.query(query, [para1], (err, data, fields) => {
        if (err) {
            callback(err.stack, undefined);

        } else {
            if ((data).length == 0) {
                callback("Data Emty", data);

            } else {
                callback(undefined, data);

            }
        }
    })
};
var InsertXB = function(para) {
    return new Promise((resolve, reject) => {
        var query = "INSERT INTO XEBON SET ?;";
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                resolve(data);

            }
        })
    })
};
var UpdateXB = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'Update XEBON SET bienso=?,taitrong=?,chuxe=?,giaycn=?,ngayhetvn=?,giayphepvt=?,ngayhetvt=?,sokhung=?,note=? where id=?;';
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.changedRows == 0 && data.affectedRows == 1) {
                    reject("Update Fail");

                } else if (data.changedRows == 0 && data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.changedRows == 1 && data.affectedRows == 1) {
                    resolve("Success");

                }
            }
        })
    })
};
var DeleteXB = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'DELETE FROM XEBON WHERE id=?;';
        connection.query(query, [para], (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                if (data.affectedRows == 0) {
                    reject("Not Found");

                } else if (data.affectedRows == 1) {
                    resolve(data);

                }
            }
        })
    })
};
/*
    TABLE DONHANG
    SELECT BY ID
    INSERT
    Update
 */
//Quản lý đơn hàng
var SelectByIDFromDH = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'SELECT * from DONHANG Where id=?;';
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.length == 0) {
                    reject("Not Found");
                } else {
                    resolve(data);

                }
            }
        })
    })
};
var SelectALLDH = function() {
    return new Promise((resolve, reject) => {
        var query = `select donhang.id,donhang.maHD,donhang.datecreate,khachhang.tenKH,taixe.cmnd,xebon.bienso,donhang.khoiluong,donhang.trangthai,donhang.nguoitao,donhang.ghichu,donhang.tramxuat,taixe.tenTX
        FROM hoakhanh.donhang
        join hoakhanh.khachhang on khachhang.id = donhang.kh
        join hoakhanh.taixe on taixe.id = donhang.taixe
        join hoakhanh.xebon on xebon.id = donhang.xe`;
        connection.query(query, (err, data, fields) => {
            if (err) {
                reject(err.stack);

            } else {
                if (data.length == 0) {
                    reject("Not Found");

                } else {
                    resolve(data);

                }
            }
        })
    })
};
var InsertDH = function(para) {
    return new Promise((resolve, reject) => {
        var query = "INSERT INTO DONHANG SET ?;";
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                resolve(data);
            }
        })
    })
};
var UpdateDH = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'Update DONHANG SET tyopHD=?,kh=?,ctyvantaiHD=?,taixe=?,xe=?,tramxuat=?,khoiluong=?,donvi=?,thanhtoan=?,ghichu=? where id=?;';
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.changedRows == 0 && data.affectedRows == 1) {
                    reject("Update Fail");
                } else if (data.changedRows == 0 && data.affectedRows == 0) {
                    reject("Not Found");
                } else if (data.changedRows == 1 && data.affectedRows == 1) {
                    resolve("Success");
                }
            }
        })
    })
};
var UpdateStatusDH = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'Update DONHANG SET tramxuat=?,trangthai=? where maHD=?;';
        connection.query(query, para, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.changedRows == 0 && data.affectedRows == 1) {
                    reject("Update Fail");
                } else if (data.changedRows == 0 && data.affectedRows == 0) {
                    reject("Not Found");
                } else if (data.changedRows == 1 && data.affectedRows == 1) {
                    resolve("Success");
                }
            }
        })
    })
};
var DeleteDH = function(para) {
    return new Promise((resolve, reject) => {
        var query = 'DELETE FROM DONHANG WHERE id=?;';
        connection.query(query, [para], (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                if (data.affectedRows == 0) {
                    reject("Not Found");
                } else if (data.affectedRows == 1) {
                    resolve(data);

                }
            }
        })
    })
};
var CreateMaHD = function() {
    return new Promise((resolve, reject) => {
        var query = `SELECT maHD FROM hoakhanh.donhang
                    order by maHD desc
                    limit 1;`;
        connection.query(query, (err, data, fields) => {
            if (err) {
                reject(err.stack);
            } else {
                var time = new Date(Date.now());
                var year = time.getFullYear();
                var month = time.getMonth();
                var date = time.getDate();
                if ((time.getMonth() + 1) < 10) {
                    month = "0" + (month + 1);
                } else {
                    month = (month + 1);
                }
                if (date < 10) {
                    date = "0" + date;
                } else {
                    date = date;
                }
                var code = "DO" + year + month + date;
                var codenow = (data[0].maHD).toString();
                var code3 = codenow.substring(0, 10);
                var stt = codenow.substring(10, 12);
                if (code3.toString() == code.toString()) {
                    if ((Number(stt) + 1) < 10) {
                        code = code + "0" + (Number(stt) + 1);
                    } else {
                        code = code + (Number(stt) + 1);
                    }
                } else {
                    code = code + "01";
                }
                resolve(code);
            }
        })

    })
};
module.exports = { SelectALL, SelectByUserNameFromTK, SelectByIDFromTK, UpdateTK, InsertTK, DeleteTK, SelectByIDFromKH, UpdateKH, InsertKH, DeleteKH, SelectByIDFromTX, UpdateTX, InsertTX, DeleteTX, SelectByIDFromXB, InsertXB, UpdateXB, DeleteXB, SelectByIDFromDH, SelectALLDH, CreateMaHD, InsertDH, UpdateDH, DeleteDH, UpdateStatusDH }