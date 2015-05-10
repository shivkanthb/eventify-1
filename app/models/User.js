var mongoose=require('mongoose');
var userSchema = mongoose.Schema({
    handle: String,
    content: String,
    events: [Number]
});
var User=mongoose.model('User',userSchema);
module.exports=User;