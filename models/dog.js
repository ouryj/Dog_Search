let mongoose = require('mongoose');

let dogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: String,
    image: String,
    owner: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'User'
        },
        username: String 

    },
    created: {type: Date, default: Date.now},
    comments: [
        {type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
        }
    ]
})
module.exports = mongoose.model('Dog', dogSchema);