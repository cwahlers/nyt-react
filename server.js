// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require('body-parser');
var omdb  = require("omdb");
var request = require("request");

var PORT = process.env.PORT || 3001;
var app = express();

// Set the app up with morgan
app.use(logger("dev"));

app.use(bodyParser());

// Database configuration
var databaseUrl = process.env.MONGODB_URI || "nytreact_db";
var collections = ["articles"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl , collections);
// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
  //allow the api to be accessed by other apps
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });


// articles routes
// ======
  //documentation for mongojs:
    //https://github.com/mafintosh/mongojs

  app.get("/articles", function(req, res) {
    //sort songs
    // db.articles.aggregate(
    //    [
    //      { $sort : { votes : -1 } }
    //    ], function(error, articles){

    //     res.json(articles);
    // });
    // Find all songs in the songs collection
      db.articles.find({}, function(error, articles) {
        // Log any errors
        if (error) {
          console.log(error);
        }
        // Otherwise, send json of the songs back to user
        // This will fire off the success function of the ajax request
        else {
          //pretend that it takes 5 seconds to get the songs back
          //setTimeout(function(){
            res.json(articles);
          //}, 5000)
        }
      });
  });

  // Handle form submission, save submission to mongo
  app.post("/articles", function(req, res) {
    
    // Insert the song into the songs collection
    db.articles.insert(req.body, function(error, savedArticle) {
      // Log any errors
      if (error) {
        console.log(error);
      }else {
        //the reason why we are sending the savedSong back is because we now have an _id to give to the client
        res.json(savedArticle);
      }
    });
  });

  //get one article
  app.get("/articles/one/:id", function(req, res) {
    db.articles.findOne({
      "_id": mongojs.ObjectId(req.params.id)
    }, function(error, oneArticle) {
      if (error) {
        res.send(error);
      }else {
        res.json(oneArticle);
      }
    });
  });

  //update an article
  app.put("/articles/:id", function(req, res) {
    //if we use this then we won't get the updated document back
    /* 
      db.songs.update({
        "_id": mongojs.ObjectId(req.params.id)
      }, {
        $set: {
          "artist": req.body.artist,
          "songName": req.body.songName
        }
      }, function(error, editedSong) {
        if (error) {
          res.send(error);
        }else {
          res.json(editedSong);
        }
      });
    */

    db.articles.findAndModify({
      query: { 
        "_id": mongojs.ObjectId(req.params.id) 
      },
      update: { $set: {
        "title": req.body.title } 
      },
      new: true
      }, function (err, editedArticle) {
          res.json(editedArticle);
      });
  });

//up to 8:59 explain with your partners
  app.put("/articles/votes/:id/:direction", function(req, res){

    var voteChange = 0;

    if (req.params.direction == 'up') voteChange = 1;
    else voteChange = -1; 

    //this is wrong I want to grab the current votes and increment by 1
    db.articles.findAndModify({
      query: { 
        "_id": mongojs.ObjectId(req.params.id) 
      },
      update: { $inc: { votes: voteChange} },  
      new: true
      }, function (err, editedArticle) {
          res.json(editedArticle);
      });
  });

  app.delete("/articles/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);

    db.articles.remove({
      "_id": mongojs.ObjectID(id)
    }, function(error, removed) {
      if (error) {
        res.send(error);
      }else {
        res.json(id);
      }
    });
  });


 app.get("/articles/nyt/:q", function(req, res) {

    var query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + req.params.q +"&api-key=1ea4346188f64d96813b056297a0a9e9";

    request(query, function (error, response, body) {
      let ret = [];
      let results = JSON.parse(response.body);
      let arts = results.response.docs;
      arts.forEach(function (art){
        ret.push({_id: art._id, title: art.snippet, date: art.pub_date, url: art.web_url});
      })
      res.json(ret);
    });
  })

// Listen on port 3001
  app.listen(PORT, function() {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
  });
