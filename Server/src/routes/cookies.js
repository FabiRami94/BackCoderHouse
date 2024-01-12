
const {Router} = require('express');
const cookieRouter = Router();

cookieRouter.get('/setCookie', (req, res) => {
// ('Nombre de la Cookie', 'Valoe de la Cookie', {maxage: tiempo de vida en milisegundos})
    res.cookie('newCookie','Valor alto', {maxAge: 100000, signed: true}).send('cookies');
});

cookieRouter.get('/getCookies', (req, res) => {
    //if no is signed => req.cookies
    res.send(req.signedCookies);
});

cookieRouter.get('/deleteCookie', (req, res) => {
    //name the cookie to delete
    res.clearCookie('newCookie').send('cookie removed')
});

module.exports = cookieRouter;