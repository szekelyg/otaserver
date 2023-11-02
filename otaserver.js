const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/update', (req, res) => {
    // Itt kezeld az OTA frissítési kérést
    // Például: Ellenőrizd a verziót, küldd el a bináris fájlt, stb.
    res.json({ success: true, message: 'OTA update endpoint' });
});

app.listen(PORT, () => {
    console.log(`OTA Server is running on port ${PORT}`);
});
