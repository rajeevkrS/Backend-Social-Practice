const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts'); //(npm install express-ejs-layouts)
const db = require('./config/mongoose');

//use static file 
app.use(express.static('./assets'));


//use express layout
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));


//setup the view engine .ejs
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ; ${err}`);
    }

    console.log(`Server is running on Port: ${port}`);
})










