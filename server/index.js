const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require ('cors');
const path = require('path');
const db = require('../database/PGindex');
const port = process.env.PORT || 5000;
app.use(cors());

const filePath = path.join(__dirname, '/../public')
app.use('/cats', express.static(filePath));
// console.log(filePath);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/cats/info', async (req, res) => {
  try{
  const catGetReq = await db.getAllCats();
    res.status(200).send(catGetReq);
  } catch(e){
    // if (Error.Message === 'Error Inside DB Get') {
      res.statusCode(500);
    // }
}
});

app.post('/owner/add', async (req, res) => {
  try {
    const {firstname, lastname, email, week, weekday, timeblock, catid} = req.body;
    console.log(firstname, lastname, email, week, weekday, timeblock, catid);
    const rowId = await db.createUpdateOwner(firstname, lastname, email, week, weekday, timeblock, catid);
    res.status(201).send(`User added or updated with row id: ${rowId}`);
  } catch (e) {
    // if (Error.Message === 'Error Inside DB Post') {
      res.sendStatus(500);
    // }
  }
});

app.delete('/owner/delete', async (req, res) => {
  try {
    const {email} = req.body;
    console.log("email", email);
    const rowId = await db.deleteOwner(email);
    res.status(200).send(`User deleted: ${rowId}`);
  } catch (e) {
    // if (Error.Message === 'Error Inside DB Post') {
      res.sendStatus(500);
    // }
  }
});




app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
