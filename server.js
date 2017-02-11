const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');
const bodyParse = require('body-parser');
const Url       = require('./url.model.js');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener-microservice';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.json({'status': 200, 'message': Url});
});

app.get('/new/:path', (req, res) => {
  let path = req.params.path;
  let i = path.search('http://');
  if(i <= 0){
    path = `http://${path}`;
  }
  Url.create({path: path})
    .then((url) => {
      res.json({
        "original_url": req.params.path,
        "short_url": `http://localhost:3001/${url._id}`
      });
    })
    .catch((err) => {
      if(err)console.log(err);
    });;
});

app.get('/:id', (req,res) => {
  Url.findById(req.params.id)
    .then((url) => {
      // res.json({'path': url.path});
      res.redirect(url.path);
    })
    .catch((err) => {
      if(err)console.log(err);
    });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('**************');
  console.log('SERVER RUNNING');
  console.log('**************');
});
