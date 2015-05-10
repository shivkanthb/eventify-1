var Event=require('./app/models/Event');
var User=require('./app/models/User');
var express=require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session=require('express-session');
app.use(session({secret: 'ssshhhhh',
		 resave: true,
		 saveUninitialized: true}));
mongoose.connect('mongodb://localhost:27017/eventify');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port=process.env.PORT || 8080;
app.get('/',function(req,res){
    res.json({message: 'hooray! welcome to our api!'});
});
app.post('/events',function(req,res){
    if(req.session.userId){
	var event=new Event();
	var userId=req.session.userId;
	event.name=req.body.name;
	event.location.latitude=req.body.latitude;                                                                                                
        event.location.longitude=req.body.longitude;                                                                                              
        event.location.time=req.body.time;   
	event.owner=userId;
	event.save(function(req,res){
	    if(err)
		res.send(err);
	    res.json({message: 'Event Created'});
	});
    }
    else
	res.json({message: 'Unauthorized'});
});
app.put('/events/:code',function(req,res){
    var code=req.params.code;
    if(req.session.userId){
	var userId=req.session.userId;
	Event.findOne({ezCode: code},function(err,event){
	    if(err)
		res.send(err);
	    if(event.owner==userId){
		event.name=req.body.name;
		event.location.latitude=req.body.latitude;
		event.location.longitude=req.body.longitude;
		event.location.time=req.body.time;
		event.save(function(err){
		    if(err)
			res.end(err);
		    res.json({message: 'Event Updated'});
		});
	    }
	    else
		res.json({message: 'Unauthorized'});
	});
    }
    else
	res.json({message: 'Unauthorized'});
});
app.delete('/events/:code',function(req,res){
    var code=req.params.code;
    if(req.session.userId){
	var userId=req.session.userId;
	Event.findOne({ezCode: code},function(err,event){
	    if(err)
		res.send(err);
	    if(event.owner==userId){
		var eventId=event._id;
		Event.remove({_id: eventId},function(err,event){
		    if(err)
			res.send(err);
		    res.json({message: 'Event deleted'});
		});
	    }
	    res.json({message: 'Unauthorized'});
	});
    }
    res.json({message: 'Unauthorized'});
});
app.listen(port);
console.log("Server running on port "+port);