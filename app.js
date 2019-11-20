let express = require('express'),
    app           = express(),
    User          = require('./models/user'),
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser'),
    methodOverride = require('method-override'),
    dogRoute       = require('./routes/dog'),
    commentRoute   = require('./routes/comment'),
    userRoute      = require('./routes/user'),
    passport       = require('passport'),
    localPassport  = require('passport-local'),
    dogModel       = require('./models/dog');


// connect mongoose
mongoose.connect('mongodb://localhost:27017/dog_blog',{useNewUrlParser:true, useUnifiedTopology:true})
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(require('express-session')({
    secret: 'dog dont bite',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user ;
    next();
});



app.use(dogRoute);
app.use(commentRoute);
app.use(userRoute);
// app.use(dogModel);




// connect server
app.listen(3000,function(){
    console.log('dog is barking on port 3000');
})