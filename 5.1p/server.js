const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const bookRoutes = require('./routes/books.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});