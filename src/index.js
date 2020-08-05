const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


//Ini
const app = express();
require('./db');
require('./passport/local-auth');

//middlewares
app.use(express.urlencoded({extended:false})); //para no recibir archivos que no sean datos
app.use(session({
    secret: 'MananoSecretSession',
    resave : false,
    saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



app.use((req,res,next)=>{
    app.locals.signupMessage = req.flash("signupMessage");
    app.locals.signinMessage = req.flash("signinMessage");
    app.locals.user= req.user;
    next();
 })



//Rutas
app.use('/', require('./routes/index'));

//conf.
app.set('views', path.join(__dirname, 'views'));
app.set('port',process.env.PORT || 1998)
app.engine('ejs',engine);
app.set('view engine', 'ejs');

//Iniciar server

app.listen(app.get('port'),()=>{
    console.log("Server corriendo en", app.get('port'))
})