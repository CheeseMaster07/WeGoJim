const express = require('express');
const router = express.Router();
const Gymbro = require('../models/gymbro')

// All gymbros route
router
.route('/')
.get( async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name != '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const gymbros = await Gymbro.find(searchOptions)
    res.render("gymbros/index", {gymbros: gymbros, searchOptions: req.query});
  } catch (err) {
    res.redirect('/')
    console.error(err)
  }
})
.post( async (req, res) => {
  const gymbro = new Gymbro({
    name: req.body.name,
    age: req.body.age,
    favoriteExercise: req.body.favoriteExercise,
    bench: req.body.bench,
    squat: req.body.squat,
    deadlift: req.body.deadlift
  })

  try {
    const newGymbro = await gymbro.save()
    //res.redirect(`gymbros/${newGymbro.id}`)
    res.redirect('/gymbros')
  } catch (err) {
    res.render('gymbros/new', {gymbro: gymbro, errorMessage: "Error when creating gymbro"})
    console.log(err)
  }
})

// new gymbro route
router.get('/new', (req, res) => {
  res.render("gymbros/new", {gymbro: new Gymbro()});
})


module.exports = router

