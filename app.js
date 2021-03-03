const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { SelectByUserNameFromTK } = require('./model/CRUD');
const app = express();
const publicDirectoryPath = path.join(__dirname, './public');
const views = path.join(__dirname, './views');


app.use('/assets', express.static(publicDirectoryPath))
app.use('/user/assets', express.static(publicDirectoryPath))
app.use('/DH/assets', express.static(publicDirectoryPath))
app.use('/TX/assets', express.static(publicDirectoryPath))
app.use('/XB/assets', express.static(publicDirectoryPath))
app.use('/KH/assets', express.static(publicDirectoryPath))
app.use('/TK/assets', express.static(publicDirectoryPath))
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 1800000 }
}));


app.get("/", (req, res) => {
    if (req.session.User == undefined || req.session.isAuth == false) {
        res.redirect("/user/login")
    } else {
        res.redirect("/dashboard")
    }
})

app.use('/dashboard', require('./routes/dashboard'));
app.use('/user', require('./routes/user'));
app.use('/DH', require('./routes/DH'));
app.use('/TX', require('./routes/TX'));
app.use('/XB', require('./routes/XB'));
app.use('/KH', require('./routes/KH'));
app.use('/TK', require('./routes/TK'));
app.listen(80, () => {
    console.log('Server is up on port 80.')
});