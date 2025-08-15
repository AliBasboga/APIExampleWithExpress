import express from "express"
import cors from "cors"
import 'dotenv/config'
import {limiter} from "./middleware/middleware.js";
import {countries} from "./countriesOfTheWorld.js"
// const cors = require('cors'); // CORS desteği eklemek için
const app = express();

// CORS orta katmanını ekle
app.use(cors());
app.use(limiter)

// Ülkeler listesi
// const countries = [
//     { name: 'Afghanistan', code: 'AF' },
//     { name: 'Albania', code: 'AL' },
//     { name: 'Algeria', code: 'DZ' },
//     { name: 'Andorra', code: 'AD' },
//     { name: 'Angola', code: 'AO' },
//     { name: 'Turkey', code: 'TR' },
//     { name: 'United States', code: 'US' },
//     { name: 'United Kingdom', code: 'GB' }
// ];

// Ülkeler API rotaları
app.get('/api/countries/:code', (req, res) => {
    const code = req.params.code.toUpperCase();
    const country = countries.find(country => country.code === code);
    if (country) {
        res.json(country);
    } else {
        res.status(404).json({ message: 'Country not found' });
    }
});

app.get('/api/flags', (req, res) => {
  res.json(countries);
});

// Sunucuyu başlat
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
