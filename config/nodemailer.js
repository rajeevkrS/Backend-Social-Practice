const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// transporter : it defines the config. using which I will be sending emails
let transporter = nodemailer.createTransport({
    // properties:
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: asdsa,
        pass: ssa
    }
});

// Definig that we will be using ejs which is "template rendering engine"
// "relativePath": is where the mail is being sent
let renderTemplate = (data, relativePath) => {
    let mailHTML; // in this variable i will be storing what all HTML is going to be sent in that mail.

    ejs.renderFile(
        path.join(__dirname, "../views/mailers", relativePath),
        // the context that we pass to the ejs 
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template');
                return;
            }

            mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}





