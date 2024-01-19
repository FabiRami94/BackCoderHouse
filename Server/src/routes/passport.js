
const {Router} = require('express');
const passportRouter = Router();
const passport = require('passport');
const local = require('passport-local');
const { createHash, isValidPassword } = require('../utils/hashPassword');
const GitHubStrategy = require('passport-github2');
require('dotenv').config();
const {CLIENT_ID, CLIENT_SECRET} = process.env;

const localStrategy = local.Strategy;

passport.use('github', new GitHubStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/session/githubcallback'
}, async (accesToken, refreshToken, profile, done)=>{
    try{
        console.log(profile)
        let user = await userService.getUserBy({email: profile._json.email})
        if (!user) {
            let newUser = {
                first_name: profile.username,
                last_name: profile.username,
                email: profile._json.email,
                password: '123'
            }
            let result = await userService.createUser(newUser)
            return done(null, result)
        }
        done(null, user)
    }catch(err){
        return done(err)
    }
}))

// save and take sessions user credentials
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    let user = await userService.getUserBy({_id: id})
    done(null, user)
})


// const initializePassport = () => {
//     passport.use('register', new localStrategy(
//         {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) =>{
            
//             const {first_name, last_name, email, age} = req.body;

//             try {
//                 let user = await userService.findOne({email:username});
//                 if(user){  //userService future error.
//                     console.log('user already exist');
//                     return done(null, false);
//                 }
//                 const newUser = {
//                     first_name,
//                     last_name,
//                     email,
//                     age,
//                     password: createHash(password)
//                 }
//                 let result = await userService.create(newUser);
//                 return done(null, result)
//             } catch (error){
//                 return done('Error al obtener el resultado' + error);
//             }
//         }
//     ))
        // passport.serializeUser((user, done) => {
        //     done(null, user._id);
        // });

        // passport.deserializeUser( async (id, done) => {
        //     let user = await userService.findById(id);
        //     done(null, user);
        // });
// };

passport.use('login', new localStrategy(
    {usernameField: 'email'}, async(username, password, done) => {
        try{
            const user = await userService.findOne({email:username})
            if(!user){
                console.log('User doesnt exist');
                return done(null, false);
            }
            if(!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error){
            return done(error);
        }
    }))

module.exports = initializePassport;

passportRouter.post(
    'register', passport.authenticate(
        'register',{
            failureRedirect: '/failregister'}), async(req, res) => {
                res.status(200).send('Usuario registrado')
})

passportRouter.get('/failregister', (req, res) => {
    console.log('failed strategy');
    res.send({error: 'failed'});
});

module.exports = passportRouter;