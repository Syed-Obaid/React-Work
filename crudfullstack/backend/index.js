const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { User } = require('./model/todosmodel');
require('dotenv').config();
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  // res.redirect(process.env.FRONTEND_URL);
  res.json({ message: 'Welcome to the Todo API' });
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await User.find();
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { id, task, complete } = req.body;
    if (!task) return res.status(400).json({ error: 'Task is required' });

    const newTodo = await User.create({ id, task, complete });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.deleteOne({ id: parseInt(id) });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, complete } = req.body;

    const updatedTodo = await User.findOneAndUpdate(
      { id: parseInt(id) },
      { task, complete },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ✅ Connect DB and start server
connectDB()
  .then(() => {
    console.log('Database Connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database not connected', err);
  });
