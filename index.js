const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const errorhandler = require('errorhandler');
const passport = require('passport');
const Joi = require('joi');
const Fawn = require('fawn');

// --- Add Object ID validation to Joi
Joi.objectId = require('joi-objectid')(Joi);

// --- Check if jwtPrivateKey is defined
if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}

// --- Monkey patch route handlers at runtime
require('express-async-errors');

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

// --- Startup configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
if (!isProduction) app.use(errorhandler());

app.use(passport.initialize());
require('./startup/passport')(passport);

// --- Connect to DB
mongoose
    .connect(
        config.get('db'),
        { useNewUrlParser: true }
    )
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.log('Unable to connect to DB'));
// --- Enable logging collection methods + arguments to the console
// mongoose.set('debug', true);
Fawn.init(mongoose);

// --- Routes
app.use(require('./routes'));

// --- Serve static content
if (isProduction) {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

if (!isProduction) {
    app.use(require('morgan')('tiny'));

    // --- Error Handlers
    // Development - print stacktrace
    app.use((err, req, res, next) => {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err
            }
        });
    });
}
// Production - no stacktrace
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {}
        }
    });
});

// --- Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
