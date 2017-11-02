/**
* setup
*
* @author  Siyuan Gao <siyuangao@gmail.com>
* @license MIT
*/

/* eslint no-process-env: 0 */
const Env = require('require-env');
const Express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const { ParseServer, S3Adapter } = require('parse-server');
const crypto = require('crypto');

const AppSingleton = require('./appsingleton');

function config() {
    const sharedInstance = AppSingleton.getInstance();

    sharedInstance.serviceName = process.env.SERVICE_NAME || 'elica-weather';

    // Creating a server instance
    sharedInstance.server = Express();
    sharedInstance.server.use(bodyParser.json());
    sharedInstance.server.use(expressValidator());

    sharedInstance.masterKey = process.env.MASTER_KEY || crypto.randomBytes(20).toString('hex');
    sharedInstance.appId = process.env.APP_ID || sharedInstance.serviceName;

    const api = new ParseServer({
        databaseURI: process.env.MONGO || 'mongodb://localhost:27017/dev',
        // cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
        appId: sharedInstance.appId,
        masterKey: sharedInstance.masterKey,
        serverURL: `http://localhost:${process.env.PORT || 8080}/parse`,
        publicServerURL: `http://localhost:${process.env.PORT || 8080}/parse`,
        filesAdapter: new S3Adapter(
            Env.require('S3_ACCESS_KEY'),
            Env.require('S3_SECRET_KEY'),
            Env.require('S3_BUCKET'),
            {
                directAccess: true
            }
        )
    });
    sharedInstance.server.use('/parse', api);

}

module.exports = { config };
