import express from 'express';
import cors from 'cors';
import fileRoutes from './src/routes/fileRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'files' directory
app.use('/files', express.static(path.join(__dirname, 'files')));

// Use file routes for file operations
app.use('/api', fileRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
