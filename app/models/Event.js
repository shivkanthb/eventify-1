var mongoose=require('mongoose');
var eventSchema=mongoose.Schema({
    name: String,
    ezCode: String,
    location: {
	latitude: Number,
	longitude: Number
    },
    date: Date,
    owner: Number,
    guests: [Number]
});
var Event=mongoose.model('Event', eventSchema);
module.exports=Event;
