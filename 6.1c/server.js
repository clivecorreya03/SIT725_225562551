const express = require('express');
const { add } = require('./calculator');

const app = express();

const port = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Sum Calculator API');
});

// REST API endpoint
app.get('/add', (req, res) => {

    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    // Check for missing or invalid input
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Invalid input');
    }

    const result = add(a, b);

    res.send(`The sum of ${a} and ${b} is: ${result}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});