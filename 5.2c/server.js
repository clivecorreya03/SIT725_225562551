const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = 3000;

// MongoDB database URI
const mongoURI = 'mongodb://127.0.0.1:27017/booksDB';

// Middleware
app.use(express.json());

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const booksRoute = require('./routes/books.routes');

app.use('/api/books', booksRoute);


// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {

        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    })
    .catch((error) => {

        console.error('MongoDB connection error:', error);

    });