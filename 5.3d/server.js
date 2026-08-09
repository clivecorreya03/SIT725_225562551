const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = 3000;

const mongoURI =
    'mongodb://127.0.0.1:27017/booksDB';


// middleware
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);


// integrity endpoint
app.get('/api/integrity-check42', (req, res) => {
    res.status(204).send();
});


// books routes
const booksRoute =
    require('./routes/books.routes');

app.use(
    '/api/books',
    booksRoute
);


// database connection
mongoose
    .connect(mongoURI)

    .then(() => {

        console.log('Connected to MongoDB');

        app.listen(PORT, () => {

            console.log(
                `Server running at http://localhost:${PORT}`
            );

        });

    })

    .catch(error => {

        console.error(
            'MongoDB connection error:',
            error
        );

    });