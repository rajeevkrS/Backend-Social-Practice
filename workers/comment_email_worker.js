// here we created a worker which is going to send those emails for us instead of sending it via controller

const queue = require('../config/kue');

// Calling "commentsMailer" using this will be setting "newComment()" inside the queue because if a 1000 comments are being sent/added to my website, all of those are inside this queue.
const commentsMailer = require('../mailers/comments_mailer');


// Now every 'worker' has the process() function. It will helps in telling the worker that whenever a new task in added into your queue, it will run the code inside the process() function.
// type/name of queue: "emails",
// for this emails, i will use a function which takes first argument as "job(what it need to do)".
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job', job.data); // "job.data" holds the data that is sent which a "comment"

    commentsMailer.newComment(job.data);

    done();
})


