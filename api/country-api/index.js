const express = require('express');
const cors = require('cors'); // CORS desteği eklemek için
const rateLimit = require('express-rate-limit');
const app = express();

// CORS orta katmanını ekle
app.use(cors());

// Rate limiting middleware 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: "Too many requests, please try again later." }
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

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
app.get('/api/countries', (req, res) => {
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
