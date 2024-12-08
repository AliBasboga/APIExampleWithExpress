const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());

// Added a rate limiter ( 100 requests / 15 min )
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
  headers: true, // Include rate limit headers in the response
});

// Appling the rate limiter to all API routes
app.use("/api", apiLimiter);


const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Turkey", code: "TR" },
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
];

app.get("/api/countries", (req, res) => {
  res.json(countries);
});

app.get("/api/countries/:code", (req, res) => {
  const code = req.params.code.toUpperCase();
  const country = countries.find((c) => c.code === code);
  if (country) {
    res.json(country);
  } else {
    res.status(404).json({ message: "Country not found" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
