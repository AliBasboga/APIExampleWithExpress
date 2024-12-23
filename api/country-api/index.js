const express = require('express');
const cors = require('cors'); // CORS desteği eklemek için
const app = express();

// importing rate limit package and setting attributes
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes (change as your requirement)
	limit: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: "Too many requests, please try after 15 mins.",
    statusCode: 429
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// CORS orta katmanını ekle
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
