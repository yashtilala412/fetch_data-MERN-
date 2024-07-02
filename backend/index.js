const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/idolsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Idol schema
const idolSchema = new mongoose.Schema({
  name: String,
  height: Number,
  category: String,
  price: Number
});

const Idol = mongoose.model('Idol', idolSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cors middleware
app.use(cors());

// CRUD operations

// Create
app.post('/idols', async (req, res) => {
  try {
    const { name, height, category, price } = req.body;
    const newIdol = new Idol({ name, height, category, price });
    await newIdol.save();
    res.status(201).json(newIdol);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all
app.get('/idols', async (req, res) => {
  try {
    const idols = await Idol.find();
    res.json(idols);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one
app.get('/idols/:id', getIdol, (req, res) => {
  res.json(res.idol);
});

// Update
app.patch('/idols/:id', getIdol, async (req, res) => {
  if (req.body.name != null) {
    res.idol.name = req.body.name;
  }
  if (req.body.height != null) {
    res.idol.height = req.body.height;
  }
  if (req.body.category != null) {
    res.idol.category = req.body.category;
  }
  if (req.body.price != null) {
    res.idol.price = req.body.price;
  }
  try {
    const updatedIdol = await res.idol.save();
    res.json(updatedIdol);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
app.delete('/idols/:id', async (req, res) => {
  try {
    const deletedIdol = await Idol.findByIdAndDelete(req.params.id);
    if (!deletedIdol) {
      return res.status(404).json({ message: 'Idol not found' });
    }
    res.json({ message: 'Idol deleted', deletedIdol });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getIdol(req, res, next) {
  let idol;
  try {
    idol = await Idol.findById(req.params.id);
    if (idol == null) {
      return res.status(404).json({ message: 'Idol not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.idol = idol;
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
