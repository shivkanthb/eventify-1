var mongoose=require('mongoose');
var userSchema = mongoose.Schema({
    handle: String,
    content: String,
    events: [Integer]
});
var User=mongoose.model('User',userSchema);
module.exports=User;