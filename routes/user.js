let express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    func    = require('../midleware/index'),
    User    = require('../models/user');

    // register route 
    router.get('/register',function(req,res){
        res.render('../views/users/register');
    })
    // logic register
    router.post('/register',function(req,res){
        let newUser = new User({username: req.body.username});
        User.register(newUser,req.body.password,function(err,user){
            if(err){
                console.log(err);
                
            }
            passport.authenticate('local')(req,res,function(){
                res.redirect('/dogs');
            })
        })
    })
    //login route
    router.get('/login',function(req,res){
        res.render('../views/users/login');
    })
// login logic
    router.post('/login',passport.authenticate('local',{
        successRedirect: '/dogs',
        failureRedirect: '/login'
    }),(req,res)=>{

    })
    //logout route 
    router.get('/logout',function(req,res){
        req.logout();
        res.redirect('/login');
    })


    module.exports = router;