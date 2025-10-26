const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  task: { type: String, required: true },
  complete: { type: Boolean, default: false },
},{
   timestamps: true,
   collection: 'Alltodos'
});

const User = mongoose.model('User', todoSchema);
module.exports = { User };
