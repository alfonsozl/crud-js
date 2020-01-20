
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Connecting to db
mongoose.connect('mongodb://localhost:27017/crud-mongo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

// Importing routes
const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 3000);

const port = app.get('port');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', indexRoutes);

// Starting the server
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
