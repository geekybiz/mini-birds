var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

//Express
var app = express();

app.use(bodyParser.json());
app.use(cors());

var db = mongojs('birds');
var sighting = db.collection('sightings');

//Create
app.post('/api/sighting', function(req, res){
  sighting.insert({location: "Utah"}, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/', function(req, res){
  sighting.find({}, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.put('/birds/:id', function(req, res){
  console.log(req.params.id)
  sighting.update({_id: mongojs.ObjectId(req.params.id)}, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.delete('/', function(req, res){
  sighting.remove(req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
















//Connection
app.listen(3000, function(){
  console.log('Listening on 3000');
});
