const express = require('express');
const router = express.Router();
const { SelectALL, DOofMonth, DHOfCustomer, StatusSuccess, StatusRunning, StatusCheck, StatusWait } = require('../model/CRUD');
const query = require('../model/CRUD');
express().set('view engine', 'ejs');
router.get('/', (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login");
    } else {
        res.render('../views/pages/index.ejs', {
            User: req.session.User
        });
    }
});
router.post('/data1/index', (req, res) => {
    try {
        SelectALL("donhang", (err, data) => {
            if (err) {
                res.send("Data Emty")
            } else {
                res.json(data);
            }
        })
    } catch (e) {
        res.status(400).send(e)
    }
});
router.post('/data/DO', async(req, res) => {
    try {
        DOofMonth().then(result => {
            res.json(result);
        }).catch(err => {
            res.send("Data Emty");
        })
    } catch (e) {
        res.status(400).send(e)
    }
});
router.post('/data/DH', async(req, res) => {
    try {
        DHOfCustomer().then(data => {
            res.json(data[0]);
        }).catch(err => {
            res.send("Data Emty");
        })
    } catch (e) {
        res.status(400).send(e)
    }
});
router.post('/data', async(req, res) => {
    let waiting, checked, running, success;
    try {
        StatusWait().then(data => {
            waiting = data;
            StatusCheck().then(data2 => {
                checked = data2;
                StatusRunning().then(data3 => {
                    running = data3;
                    StatusSuccess().then(data4 => {
                        success = data4;
                        res.json([waiting[0], checked[0], running[0], success[0]]);
                    }).catch(err => {
                        res.send("Data Emty");
                    })
                }).catch(err => {
                    res.send("Data Emty");
                })
            }).catch(err => {
                res.send("Data Emty");
            })
        }).catch(err => {
            res.send("Data Emty");
        })
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router;