let express = require('express');
let router = express.Router();
const validateSession = require('../middleware/validate-session');
const Workout = require('../db').import('../models/log');


/* ********************
 *** LOG CREATE ***
 ********************* */
router.post('/', validateSession, (req, res) => {
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
router.get('/:id', validateSession, function (req, res) {
  let userid = req.user.id;

  Workout.findAll({
    where: { owner_id: userid }
  })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/* ********************
 *** GET ENTRIES BY ID FOR INDIVIDUAL USER***
 ********************* */
router.get('/:owner_id', validateSession, function (req, res) {
  let id = req.params.id;

  Workout.findAll({
    where: { id: id }
  })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/* ********************
 *** UPDATE LOGS BY USER***
 ********************* */
router.put("/:id", validateSession, function (req, res) {
  const updateLogEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
  };

  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Workout.update(updateLogEntry, query)
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }));
});

/* ********************
 *** DELETE LOGS BY USER***
 ********************* */
router.delete(":id", validateSession, function(req, res){
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Workout.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }))
});


module.exports = router;
