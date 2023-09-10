// Import required modules
const fs = require('fs-extra');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sanitizeHtml = require('sanitize-html');
const Log = require('./log.js');
const Ban = require('./ban.js');
const Utils = require('./utils.js');
const Meat = require('./meat.js');
const Console = require('./console.js');

// Load settings
try {
    stats = fs.lstatSync('settings.json');
} catch (e) {
    if (e.code === 'ENOENT') {
        try {
            fs.copySync('settings.example.json', 'settings.json');
            console.log('Created new settings file.');
        } catch (e) {
            console.log(e);
            throw 'Could not create new settings file.';
        }
    } else {
        console.log(e);
        throw "Could not read 'settings.json'.";
    }
}

const settings = require('./settings.json');

// Create Express app and server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || settings.port;

exports.io = io;

// Initialize logging
Log.init();
const log = Log.log;

// Initialize ban list
Ban.init();

// Serve static files
if (settings.express.serveStatic) {
    app.use(express.static('../build/www'));
}

// Start listening
server.listen(port, function () {
    console.log(
        ' Welcome to BonziWORLD!\n',
        'Time to meme!\n',
        '----------------------\n',
        'Server listening at port ' + port
    );
});

app.use(express.static(__dirname + '/public'));

// ========================================================================
// Banning functions
// ========================================================================

// ========================================================================
// Helper functions
// ========================================================================

// ========================================================================
// The Beef(TM)
// ========================================================================
Meat.beat();

// Console commands
Console.listen();
