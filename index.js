import express from 'express';
import cors from 'cors';
import path from 'path';
// const cors = require('cors');
// const http = require('http');
import { fileURLToPath } from 'url';

const app  = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api', (req, res) => {
  res.send('Hello World!')
});

// handles any requests that dont match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
