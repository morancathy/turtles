const Turtle = require('../models/turtle');
const router = require('express').Router();

//Create
router.get('/test', (req, res) => {
  res.status(200).json({
    website: 'My webstie',
    info: 'not that much'
  })
})

router.post('/', async (req, res)=> { //using 'api' cause dont want routes here to interfere with routes on front end
  //res.json(req.body)  //writing just this is to test that route is working
  try{
    const createdTurtle = await Turtle.create(req.body)
    res.status(200).json(createdTurtle)
  } catch(error){
    console.error(error) //     <---- Us the backend developer
    res.status(400).json({
      message: error.message /* <----- The Front End Developer */
    })
  }
})
    //try/catch is in place of error first callback.

// Read
router.get('/', async (req, res) => {
  // res.json({"route": "index"}) //writing just this is to test that route is working
   try {
     const foundTurtles = await Turtle.find({})  //empty {} to filter by nothing
     res.status(200).json(foundTurtles)
   } catch (error) {
     console.error(error)
     res.status(404).json({
       message: error.message
     })
   }
});


router.get('/:id', async (req, res) => {
    // res.json({"route": "show"}) //writing just this is to test that route is working
  try {
    const foundTurtle = await Turtle.findById(req.params.id)
    res.status(200).json(foundTurtle)
  } catch (error) {
    console.error(error)
    res.status(404).json({
      message: error.message
    })
  }
})

// Update
router.put('/:id', async (req, res) => {
  try {
    const updateTurtle = await Turtle.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updateTurtle)
  }catch(error){
    console.error(error)
    res.status(400).json({
      message: error.message
    })
  }
})


// Delete
router.delete('/:id', async (req, res) => {
  try{
    const deleteTurtle = await Turtle.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteTurtle)
  }catch(error){
    console.error(error)
    res.status(400).json({
    message: error.message
    })
  }
})

module.exports = router;
