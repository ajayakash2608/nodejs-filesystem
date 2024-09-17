import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Create a new router instance
const router = express.Router();

// Get the directory path for files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesDir = path.join(__dirname, '../../files');

// Task 1: Create a text file with the current timestamp
router.post('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const fileName = `${timestamp}.txt`;
  const filePath = path.join(filesDir, fileName);

  // Ensure the directory exists
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).send(`File created: ${fileName}`);
  });
});

// Task 2: Retrieve all text files in the directory
router.get('/list-files', (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Filter only text files
    const textFiles = files.filter(file => file.endsWith('.txt'));
    res.status(200).json(textFiles);
  });
});

export default router;
