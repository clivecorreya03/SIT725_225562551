const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------
// Home Route
// -------------------------
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// -------------------------
// Addition API 
// Example:
// http://localhost:3000/add?num1=10&num2=20
// -------------------------
app.get('/add', (req, res) => {

    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({
            error: "Please provide valid numbers."
        });
    }

    res.json({
        operation: "Addition",
        num1,
        num2,
        result: num1 + num2
    });

});

// -------------------------
// Random Quote API
// -------------------------
let quotes = [
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot; but make it hot by striking."
];

app.get('/api/quote', (req, res) => {

    const randomIndex = Math.floor(Math.random() * quotes.length);

    res.json({
        quote: quotes[randomIndex]
    });

});

// -------------------------
// POST API to Add a Quote
// -------------------------
app.post('/api/quote', (req, res) => {

    const { quote } = req.body;

    if (!quote) {
        return res.status(400).json({
            error: "Quote is required."
        });
    }

    quotes.push(quote);

    res.status(201).json({
        message: "Quote added successfully!",
        quote
    });

});

// -------------------------
// Start Server
// -------------------------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});