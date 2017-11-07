const express = require('express');
const crypto = require('crypto');
const ParseDashboard = require('parse-dashboard');
const config = require('./dashboard-config.json');

const dashboardConfig = Object.assign({}, config);

// Set user

dashboardConfig.users[0] = {
    user: process.env.DASHBOARD_USER || 'user',
    pass: process.env.DASHBOARD_PASS || crypto.randomBytes(20).toString('hex')
};

console.log('Current configuration', JSON.stringify(dashboardConfig.users, null, 4));

var dashboard = new ParseDashboard(dashboardConfig);

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);