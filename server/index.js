const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require ('cors');
const path = require('path');
const db = require('../database/PGindex');
const port = process.env.PORT || 5000;
app.use(cors());

const filePath = path.join(__dirname, '/public')
app.use('/cats', express.static(filePath));

// app.use('/', express.static('client/dist'));
// app.use('/:id', express.static('client/dist'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/cats/info', async (req, res) => {
  try{
  const catGetReq = await db.getAllCats();
  console.log(catGetReq)
    res.status(200).send(catGetReq);
  } catch(e){
    if (Error.Message === 'Error Inside DB Get') {
      res.statusCode(500);
    }
}
});

// app.post('/owner/add', async (req, res) => {
//   try {
//     const {name, title, role, photo, bio, filmography, movieId} = req.body;
//     console.log(name, title, role, photo, bio, filmography, movieId);
//     const rowId = await db.createActor(name, title, role, photo, bio, filmography, movieId);
//     res.status(201).send(`User added with row id: ${rowId}`);
//   } catch (e) {
//     if (Error.Message === 'Error Inside DB Post') {
//       res.statusCode(500);
//     }

//   }
// });

// app.put('/actors/update', (req, res) => {
//   const {name, title, role, photo, bio, filmography, id} = req.body;
//   console.log(req.params.id);
//   console.log('PUT', name, title, role, photo, bio, filmography, id);
//   db.updateActor(name, title, role, photo, bio, filmography, id, (err, results) => {
//     if (err) {
//       res.sendStatus(500);
//       console.log(`actors PUT error=${err}`);
//     }
//     res.send(`User updated for ID: ${id}`);
//   });
// });

// app.delete('/actors/delete', (req, res) => {
//   const {id} = req.body;
//   console.log(id);
//   db.deleteActor(id, (err, results) => {
//     if (err) {
//       res.sendStatus(500);
//       console.log(`actors DELETE error=${err}`);
//     }
//     res.send(`User deleted for ID: ${id}`);
//   });
// });


//******* */OLD
// app.get('/actors/:id', (req, res) => {
//   let movieId = req.params.id;
//   console.log(movieId);
//   dbIndex.getActors(movieId, (err, results) => {
//     if (err) {
//       res.sendStatus(500);
//       console.log(`actors GET error=${err}`);
//     }
//     res.send(results);
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

/*
MONGO CONNECTION AND GET REQUESTS
const mongoose = require('mongoose');
const dbIndex = require('../database/mongo/index.js');

// let database = 'fandangit';
// mongoose.connect(`mongodb://localhost/${database}`, { useNewUrlParser: true });




// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log(`connected to ${database}!`);
// });

app.get('/actors/:id', (req, res) => {
  // console.log(JSON.stringify(req.query)); // = {"movieId":"1"}
  let movieId = req.params.id;
  console.log(movieId);
  dbIndex.getActors(movieId, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(`actors GET error=${err}`);
    }
    res.send(results);
  });
});

app.get('/actors/:id', (req, res) => {
  // console.log(JSON.stringify(req.query)); // = {"movieId":"1"}
  let movieId = req.params.id;
  console.log(movieId);
  dbIndex.getActors(movieId, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(`actors GET error=${err}`);
    }
    res.send(results);
  });
});



*/





//EXTRA
// console.log(JSON.stringify(req.query)); // = {"movieId":"1"}


// app.get('/', function(req, res) {
//   const reactPath = path.join(__dirname, '/../client/dist/index.html');
//   res.sendFile(reactPath);
// });

// app.get('/:id', function(req, res) {
//   const reactPath = path.join(__dirname, '/../client/dist/index.html');
//   res.sendFile(reactPath);
// });







