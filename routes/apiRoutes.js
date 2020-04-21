const router = require('express').Router();
const Storage = require('../db/storage.js');

router.get("/notes", function(req,res){
    Storage.getNotes()
    .then(notes => res.json(notes))
    .catch(err=> res.status(500).json(err))
  })
  
  router.post("/notes", function(req, res){
  Storage.addNotes(req.body)
  .then(note=> res.json(note))
  .catch(err=> res.status(500).json(err))
  
  })
  
  // router.delete("/notes/:id", function(req,res){
  //   Storage.removeNote(req.params.id)
  //   .then(()=>res.json({ok:true}))
  //   .catch(err=> res.status(500).json(err))
  // })

  module.exports = router;