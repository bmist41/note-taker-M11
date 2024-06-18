const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/notes', require('./routes/apiRoutes'));

// Route for the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});