
const { Router } = require('express')
const { sendMail } = require('../utils/mailResponse.js')

const mailRouter = Router();

mailRouter.get('/mail', (req, res) => {
    sendMail()
    res.send('mail sent');
});

module.exports = mailRouter;