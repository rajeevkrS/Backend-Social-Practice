const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// transporter : it defines the config. using which I will be sending emails. This the path how this communication is going to take place.
let transporter = nodemailer.createTransport({
    // properties:
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "ronaldocrcr5@gmail.com",
        pass: "xxx"
    }
});

// Whenever I am going to send html email were the file would be placed inside views/mailers folder
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

// And finally exporting these 2 properties
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}





