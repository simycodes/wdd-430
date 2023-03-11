const express =  require('express');
const app = express();
const bodyParser = require('body-parser');

// PARSE THE INCOMING DATA
app.use(bodyParser.json()); //bodyParser adds body property to req. - req.body
app.use(bodyParser.urlencoded({ extended: false }));

// PREVENTING THE CORS ERROR - ALLOWING CLIENTS FROM DIFFERENT SERVER/PORTS TO
// HAVE ACCESS TO THIS API
app.use((req, res, next) => {
  // ALL DOMAINS (VARIOUS CLIENT APPS ON) CAN ACCESS RESOURCES OF THIS API
  res.setHeader('Access-Control-Allow-Origin', '*');
  // ALL COMING CLIENTS HEADERS SHOULD HAVE THE FOLLOWING HEADERS - IF NOT BLOCK ACCESS
  res.setHeader(
   'Access-Control-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept'
   );
  // METHODS THAT CAN BE USED ON THIS API BY CLIENTS - OPTIONS IS SENT BY BROWSER
  // BEFORE ACTUAL REQUEST METHOD SUCH AS GET  TO CHECK IF THE METHOD IS VALID ON THE API
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

// ROUTE INSERT A POST
app.post('/api/posts',(req, res, next)=> {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post Added Successfully'
    });
});

// ROUTE TO GET ALL POSTS
app.get('/api/posts',(req, res, next)=> {
    const posts = [
        {
            id: '1',
            title: 'Amazing Grace!',
            content: 'God is always faithful!'
        },
        {
            id: '2',
            title: 'Ati Shani apo!',
            content: 'Life is always challenging, keep moving!'
        }
    ]
    res.status(200).json({
        message: 'Posts searched successfully',
        posts: posts
    })
});

module.exports = app;