const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// GET THE POST MODEL
const Post = require('./models/post');

// CONNECT TO THE BD
mongoose.connect("mongodb+srv://simy:reactnodecoding@nodeexpressprojects.hnksqmf.mongodb.net/mean-course-posting-app?retryWrites=true&w=majority")
.then(()=> {
    console.log("Connected to database");
})
.catch(()=> {
    console.log("Connection failed")
})

// PARSE THE INCOMING DATA
app.use(bodyParser.json()); //bodyParser adds body property to req. - req.body
app.use(bodyParser.urlencoded({ extended: false }));

// PREVENTING THE CORS ERROR - ALLOWING CLIENTS FROM DIFFERENT SERVER/PORTS TO
// HAVE ACCESS TO THIS API
app.use((req, res, next) => {
  // ALL DOMAINS (VARIOUS CLIENT APPS ON) CAN ACCESS RESOURCES OF THIS API
  res.setHeader("Access-Control-Allow-Origin", "*");
  // ALL COMING CLIENTS HEADERS SHOULD HAVE THE FOLLOWING HEADERS - IF NOT BLOCK ACCESS
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // METHODS THAT CAN BE USED ON THIS API BY CLIENTS - OPTIONS IS SENT BY BROWSER
  // BEFORE ACTUAL REQUEST METHOD SUCH AS GET  TO CHECK IF THE METHOD IS VALID ON THE API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

// ROUTE INSERT A POST
app.post('/api/posts',(req, res, next)=> {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    // SAVE POST IN DB
    post.save().then(createdPost => {
        console.log(post);
        // GET THE DB ID OF THE POST CREATED,USE IT TO UPDATE NEW POST ID ON
        // FRONT END
        res.status(201).json({
            message: 'Post Added Successfully',
            postId: createdPost._id
        });
    })
});

// ROUTE TO GET ALL POSTS
app.get('/api/posts',(req, res, next)=> {
    Post.find().then(posts => {
        console.log(posts);
        res.status(200).json({
            message: 'Posts searched successfully',
            posts: posts
        })
    })
});

// ROUTE TO DELETE A POST
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = app;