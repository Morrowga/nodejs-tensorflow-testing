const express = require('express');
const multer = require('multer');
const initializeDetection = require('./src/detectCategory')

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;

    const data = await initializeDetection(imageBuffer);

    res.json(data)

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
