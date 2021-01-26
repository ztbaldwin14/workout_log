let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');
const Workout = require('../db').import('../models/log');

router.get('/workout', function (req, res){
    res.send("This is a practice route!");
});

/* ********************
 *** LOG CREATE ***
 ********************* */
router.post('/create', validateSession, (req, res) => {
    const workoutLog = {
      description: req.body.log.description,
      definition: req.body.log.definition,
      result: req.body.log.result,
      owner_id: req.user.id,
    }
    Workout.create(workoutLog)
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({ error: err }))
  });



/* ********************
 *** GET ENTRIES BY USER ***
 ********************* */
router.get('/:description', function (req, res) {
  let title = req.params.description;

  Workout.findAll({
    where: { description: description }
  })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/* ********************
 *** UPDATE LOGS BY USER***
 ********************* */
router.put("/update/:entryId", validateSession, function (req, res) {
  const updateLogEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
  };

  const query = { where: { id: req.params.entryId, owner: req.user.id } };

  Workout.update(updateLogEntry, query)
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }));
});

/* ********************
 *** DELETE LOGS BY USER***
 ********************* */
router.delete("/delete/:id", validateSession, function(req, res){
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Journal.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }))
});


module.exports = router;


/* STARTING TEMPLATE */

// let express = require('express');
// let router = express.Router();

// module.exports = router;