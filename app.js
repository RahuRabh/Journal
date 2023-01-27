const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require('lodash');
const mongoose = require('mongoose');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require("mongoose-findorcreate");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connection to DataBase
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin-rahul:tArY8vk6BeNWaiB@atlascluster.yzpogkk.mongodb.net/JournalDB", {useNewUrlParser: true});

// /////for auth0
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use(passport.initialize());
// app.use(passport.authenticate('session'));

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true});

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   googleID: String
// });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username, name: user.name });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://www.example.com/auth/google/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));
// //////auth0


/////////Create Schema for title and content
const postSchema = new mongoose.Schema({
  title : String,
  content : String
});

//////////Creating Mongoose Model
const Post = new mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, foundPost){
      res.render("home", 
    { StartingContent : homeStartingContent,
      journalPost : foundPost });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
})

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, foundPost){
    res.render("post",{
      title: foundPost.title,
      content: foundPost.content,
      id: requestedPostId
    });
  });
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title : req.body.postTitle,
    content : req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect('/');
    } else {
      console.log(err);
    }
  });
});

app.post("/delete", (req, res) => {
  // Get id of post to be deleted from request body (passed from post.ejs btn)
  const requestedId = req.body.deleteButton;
  // Search database for post and delete; redirect to home route
  Post.findByIdAndDelete({_id: requestedId}, (err) => {
      if (!err) {
          // console.log("Blog post successfully deleted!");
          res.redirect("/");
      } else {
          console.log(err);
      }
  });
});

app.get("/contact", function(req, res){
  res.render("contact", { thirdcontent : contactContent});
})

app.get("/about", function(req, res){
  res.render("about", { secondcontent : aboutContent});
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});