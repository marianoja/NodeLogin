const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//serializo para guardar en el navegador los datos del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//deserealizo para encontrar por el id el usuario
passport.deserializeUser(async (id, done) => {
    await User.findById(id)
        .then(user => {
            done(null, user);
        })
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const userExist = await User.findOne({ email: email })

    if (userExist) {
        return done(null, false, req.flash('signupMessage', "Ha ingresado un email existente"))
    }
    else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}))

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await User.findOne({ email: email }) 
    if(!user){
        done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }

    if(!user.comparePassword(password)) {
        done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    done(null,user);
    

}))