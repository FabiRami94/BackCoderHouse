
const nodemailer = require('nodemailer')
require('dotenv').config();
const {USER_MAIL, PASS_MAIL} = process.env;

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: USER_MAIL,
        pass: PASS_MAIL,
    }
})

exports.sendMail = async () => {
    return await transport.sendMail({
        from: 'Este mail lo envia <fabioerv.1994@gmail.com>',
        to: 'fabioerv.1994@gmail.com',
        subject: 'Email de prueba',
        html:   `<div>
                    <h1>Hola, este es un email de prueba</h1>
                </div>`
    })
}