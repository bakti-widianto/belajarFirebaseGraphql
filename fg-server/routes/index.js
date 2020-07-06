var express = require('express');
var router = express.Router();
var firebase = require("firebase");

//show from firebase database
router.get('/', function (req, res, next) {
  const userReference = firebase.database().ref("/Users");
  //callback
  userReference.on("value", (snapshot) => {
    res.json(snapshot.val());
    userReference.off("value");
  }, (errorObject) => {
    res.send(`The read failed: ${errorObject.code}`)
  })
});

//add to firebase
router.post('/', function (req, res) {
  const userName = req.body.username;
  const name = req.body.name;
  const age = req.body.age;

  const referencePath = `/Users/${userName}/`;
  const userReference = firebase.database().ref(referencePath);
  userReference.set({ Name: name, Age: age }, (error) => {
    if (error) {
      res.send("Data cloud not be seved." + error);
    } else {
      res.send("Data saved successfully.")
    }
  })
});

//update data
router.put('/:username', function (req, res) {
  const userName = req.params.username;
  const name = req.body.name;
  const age = req.body.age;

  const referencePath = `/Users/${userName}/`;
  const userReference = firebase.database().ref(referencePath);
  userReference.update({ Name: name, Age: age }, (error) => {
    if (error) {
      res.send("Data cloud not be seved." + error);
    } else {
      res.send("Data updated successfully.")
    }
  })
});

//delete data
router.delete('/:username', function (req, res) {
  const userName = req.params.username;

  const referencePath = `/Users/${userName}/`
  const userReference = firebase.database().ref(referencePath);
  userReference.remove((error) => {
    if (error) {
      res.send(`Data cloud not be deleted,${error}`);
    } else {
      res.send("Data deleted successfully")
    }
  })
});

module.exports = router;
