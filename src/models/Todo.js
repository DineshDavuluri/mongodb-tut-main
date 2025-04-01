const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
