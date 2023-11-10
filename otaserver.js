const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const uploadPath = path.join(__dirname, 'uploads');
const versionsPath = path.join(__dirname, 'versions.json');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `firmware-${req.body.version}.bin`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload-firmware', upload.single('firmware'), (req, res) => {
  const versionInfo = {
    latestVersion: req.body.version,
    firmwarePath: `uploads/firmware-${req.body.version}.bin`
  };
  fs.writeFileSync(versionsPath, JSON.stringify(versionInfo, null, 2));
  res.json({ success: true, message: 'Firmware uploaded successfully!' });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/check-version', (req, res) => {
    const versionInfo = JSON.parse(fs.readFileSync(versionsPath, 'utf-8'));
    res.json(versionInfo);
  });
  
app.listen(PORT, () => {
    console.log(`OTA Server is running on port ${PORT}`);
});
