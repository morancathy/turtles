const {model, Schema} = require('mongoose');  //dont need to install because came build in with react starter kit

const turtleSchema = new Schema({
  name: String,
  role: String
}, {
  timestamps: true
})
module.exports = model('Turtle', turtleSchema)
