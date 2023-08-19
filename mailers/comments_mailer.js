const nodemailer = require('../config/nodemailer');

// Creating a function which will send the mail
// This is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside a new comment mailer', comment);

    // sending an email
    nodemailer.transporter.sendMail({
        from: 'ronaldocrcr5@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Punlished!',
        html: '<h1>Yup, your comment is now published!</h1>'
    }, (err, info) => {
        if(err){
            console.log('error in sending mail', err);
            return;
        }

        console.log('Mail Delivered', info);
        return;
    });
}


