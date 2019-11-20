let express    = require('express'),
    router     = express.Router(),
    passport   = require('passport'),
    func    = require('../midleware/index'),
    Comment    = require('../models/comment'),
    Dog        = require('../models/dog');

    router.get('/',function(req,res){
        res.redirect('/dogs');
    })
    //index route 
    router.get('/dogs',(req,res)=>{
        Dog.find({},function(err,dogs){
            if(err){
                console.log(err);
            }else{
                res.render('../views/dogs/index',{dogs:dogs});
            }
        })
    })
    //new route 
    router.get('/dogs/new', func.isAuth,function(req,res){
        res.render('../views/dogs/new');
    })
    // create route
    router.post('/dogs',func.isAuth,function(req,res){
        let owner = {
            id: req.user._id,
            username: req.user.username
        }
        let dog = new Dog({name:req.body.name,age:req.body.age,image:req.body.image,owner:owner});
        Dog.create(dog,(err,newdog)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.redirect('/dogs');
            }
        })
    })
    //show route
    router.get('/dogs/:id',func.isAuth,function(req,res){
       Dog.findById(req.params.id).populate('comments').exec((err,dog)=>{
           if(err){
               console.log(err);
               res.redirect('back');
           }else{
               res.render('../views/dogs/show',{dog:dog});
           }
       })
    })
    //edit route
    router.get('/dogs/:id/edit',func.isAuth,(req,res)=>{
        Dog.findById(req.params.id,(err,dog)=>{
            if(err){
                console.log(err);
                res.redirect('back');
            }else{
                res.render('../views/dogs/edit',{dog:dog})
            }
        })
    })
    // update route
    router.put('/dogs/:id',func.isAuth,function(req,res){
        Dog.findByIdAndUpdate(req.params.id,req.body.dog,(err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/dogs/'+req.params.id);
            }
        })
    })
    //delete route
    router.delete('/dogs/:id',func.isAuth,function(req,res){
        Dog.findOneAndRemove(req.params.id,function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    })

    module.exports = router;
   