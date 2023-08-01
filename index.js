const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts'); //(npm install express-ejs-layouts)
const db = require('./config/mongoose');

//middleware
app.use(express.urlencoded());

//setting up the "cookie-parser"
app.use(cookieParser());


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



//Revison:

//First we created "index.js" and we require our "express library" and we ran our server on port 8000.
//Then we created different folders 
//In those one is "routes folder" : initially we were using "app.get(), app.post() and so on" now we moved on to "router.get() router.post()".
    //How did we do that?
    //First we created a route file called "index.js" which is basically the centralize part for all other routes. "It tells which path should go to which file".
    //Like for users it will go to the routes "users.js" and for "/", it just calls a "homeController" (it is collection of multiple functions which are exported and those functions are called actions) So "/" which the home page goes to "homeController.home".
    //It has a controller called "home_controller.js" where it has aexported home function which "renders a view using ejs view engine called home" which setup in main "index.js" : {  //setup the view engine .ejs  }. And it will look out inside views folder were different views placed.
//Next: So whenever we have long html/ejs code or we have redandent part of html code, we put them out into different smaller files called has "PARTIALS" and naming convention that we use is "_" underscore to placed before the name of the file like "_header.ejs , _footer.ejs".
//Layout: It is a wrapper of common part or common design which every page placed inside the layout.
//Static files: We setup our static files " app.use(express.static('./assets')); " which while finds in assets folder
    //So for layout we need separate styles for layout and separate style for sub-pages which are placed inside the wrapper, so that we use these two lines {  // extract style and scripts from sub pages into the layout  }.
    //Finally we placed "<%- style %> <%- script %>" in out "layout.ejs" file, so whatever styles and scripts to be extracted they are put into these positions.
//Finaly setup our database, where we have a "config folder" were I setup a file called "mongoose.js". It has access to mongoose library and i connected to database "mongoose.connect('mongodb://127.0.0.1/codeial_development');" and exported it and finally I access it in main "index.js" file "const db = require('./config/mongoose');"


//Cookies: 
//For reading and writing into cookies, we will be using library or package called "Cookie Parser"





