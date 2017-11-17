const express = require('express');
const crypto = require('crypto');
const ParseDashboard = require('parse-dashboard');
const config = require('/data/config/dashboard-config.json');

var dashboard = new ParseDashboard(config, { allowInsecureHTTP: process.env.ALLOW_INSECURE_HTTP });

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);