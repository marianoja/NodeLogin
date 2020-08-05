const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const passport = require('passport');


//middlewares
router.use(morgan('dev'))


//rutas

router.get('/',(req,res,next)=>{
    res.render('index');
});

router.get('/signup',(req,res,next)=>{
    res.render('signup')
});

router.post('/signup',passport.authenticate('local-signup',{
    successRedirect: '/',
    failureRedirect : '/signup',
    passReqToCallback : true
}));

router.get('/signin',(req,res,next)=>{
    res.render('signin')
});

router.post('/signin',passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout',(req,res,next)=>{
    req.logOut();
    res.redirect('/');
})

router.get('/profile',isAuthenticated,(req,res,next)=>{
    res.render('profile');
})

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

module.exports = router;