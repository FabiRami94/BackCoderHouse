
const {Router} = require('express');
const sessionRouter = Router();

function auth(req, res, next){
    if (req.session?.user === 'Fabián' && req.session?.admin) {
        return next()
    }
    return res.status(401).send('error de autorización!')
}

sessionRouter.get('/session', (req, res) => {

    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
    }
    else {
        req.session.counter = 1;
        res.send('Bienvenido');
    }
});

sessionRouter.get('/logout', (req, res) => {

    req.session.destroy( err => {
        if(!err) res.send('Logout Exitoso!')
        else res.send({err})
    })
});

sessionRouter.get('/login', (req, res) => {

    const {username, password} = req.query;

    if(username !== 'Fabián' || password !== '123456'){
        return res.send('login failed!!')
    } 
    req.session.user = username;
    req.session.admin = true;
    req.send('login succes!')
});

sessionRouter.get('/private', auth, (req, res) => {

    res.send('si estas viendo esto es porque ya te logueaste!')
});

module.exports = sessionRouter;