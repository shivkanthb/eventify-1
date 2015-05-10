var mongoose=require('mongoose');
var userSchema = mongoose.Schema({
    handle: String,
    password: String,
    name: String,
    events: [Number]
});
var User=mongoose.model('User',userSchema);
module.exports=User;