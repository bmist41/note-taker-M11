const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const notesFilePath = path.join(__dirname, '../db/db.json');

// Helper function to read notes from the file
const readNotes = () => {
  const data = fs.readFileSync(notesFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write notes to the file
const writeNotes = (notes) => {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
};

// Get all notes
router.get('/', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Add a new note
router.post('/', (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now().toString(),
    title: req.body.title,
    text: req.body.text
  };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// Delete a note by ID
router.delete('/:id', (req, res) => {
  const notes = readNotes();
  const updatedNotes = notes.filter(note => note.id !== req.params.id);
  writeNotes(updatedNotes);
  res.json({ id: req.params.id });
});

module.exports = router;