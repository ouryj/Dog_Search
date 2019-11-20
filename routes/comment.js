let Comment = require('../models/comment'),
    Dog     = require('../models/dog'),
    express = require('express'),
    func    = require('../midleware/index'),
    router  = express.Router();
   
    //comment routes new 
    router.get('/dogs/:id/comments/new',function(req,res){
        Dog.findById(req.params.id,(err,dog)=>{
            if(err){
                console.log(err);
            }else{
                res.render('../views/comments/new',{dog:dog});
            }
        })
    })
    //comments create route
    router.post('/dogs/:id/comments',(req,res)=>{
        Dog.findById(req.params.id,(err,dog)=>{
            if(err){
                console.log(err);
            }else{
                let author = {
                    id: req.user._id,
                    username: req.user.username
                }
                let comment = new Comment({text:req.body.text,author:author})
                Comment.create(comment,(err,comment)=>{
                    if(err){
                        console.log(err);
                    }else{
                       
                        comment.save();
                        dog.comments.push(comment);
                        dog.save();
                        res.redirect('/dogs/'+req.params.id);
                    }
                })
            }
        })
    })



    module.exports = router;
