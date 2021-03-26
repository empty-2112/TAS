const path = require('path');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const { SelectByUserNameFromTK, findOne } = require('./model/CRUD');
const auth = require('./middleware/auth');
const ScanPLC = require("./model/ScanPLC");
const { request } = require('https');
//
const app = express();
const publicDirectoryPath = path.join(__dirname, './public');
const views = path.join(__dirname, './views');

//app.use(express.static(__dirname + '/public/Storage'));
app.use('/assets', express.static(publicDirectoryPath));
//app.use('/user/assets', express.static(publicDirectoryPath))

app.use('/user/assets', express.static(publicDirectoryPath));
app.use('/DH/assets', express.static(publicDirectoryPath));
app.use('/TX/assets', express.static(publicDirectoryPath));
app.use('/XB/assets', express.static(publicDirectoryPath));
app.use('/KH/assets', express.static(publicDirectoryPath));
app.use('/TK/assets', express.static(publicDirectoryPath));
app.use('/Report/assets', express.static(publicDirectoryPath));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: {}
}));

app.get("/", (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login")
    } else {
        res.redirect("/dashboard")
    }
})


app.use('/dashboard', auth, require('./routes/dashboard'));
app.use('/user', require('./routes/user'));
app.use('/DH', auth, require('./routes/DH'));
app.use('/TX', auth, require('./routes/TX'));
app.use('/XB', auth, require('./routes/XB'));
app.use('/KH', auth, require('./routes/KH'));
app.use('/TK', auth, require('./routes/TK'));
app.use('/Report', auth, require('./routes/Report'));

//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
//
app.use((err, req, res, next) => {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});
//ScanPLC

app.listen(80, () => {
    console.log('Server is up on port 80.')
});