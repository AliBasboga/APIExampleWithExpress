const express = require('express');
const cors = require('cors'); // CORS desteği eklemek için
const app = express();

const rateLimit = require('express-rate-limit')

// CORS orta katmanını ekle

const limiter = rateLimit ({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

app.use(limiter);
app.use(cors());
// Ülkeler listesi
const countries = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Turkey', code: 'TR' },
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'GB' }
];

// Ülkeler API rotaları
app.get('/api/countries',  (req, res) => {
    res.json(countries);
});

app.get('/api/countries/:code', (req, res) => {
    const code = req.params.code.toUpperCase();
    const country = countries.find(c => c.code === code);
    if (country) {
        res.json(country);
    } else {
        res.status(404).json({ message: 'Country not found' });
    }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
