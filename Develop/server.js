const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware to parse JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/notes', require('./routes/apiRoutes'));
app.use(express.json());

// Route for the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});