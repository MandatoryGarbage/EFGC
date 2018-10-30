// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('appPath', 'dist/EFGC');
app.use(express.static(__dirname +'/dist/EFGC'));

// Set our api routes
app.use('/api', api);

app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/EFGC/index.html'));
  });


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));