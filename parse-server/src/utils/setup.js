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
const { ParseServer, S3Adapter, FileSystemAdapter } = require('parse-server');
const crypto = require('crypto');

const AppSingleton = require('./appsingleton');

function config() {
    const sharedInstance = AppSingleton.getInstance();

    sharedInstance.serviceName = process.env.SERVICE_NAME || 'elica-weather';

    // Creating a server instance
    sharedInstance.server = Express();
    sharedInstance.server.use(bodyParser.json());
    sharedInstance.server.use(expressValidator());

    sharedInstance.masterKey = process.env.PARSE_MASTER_KEY;
    sharedInstance.appId = process.env.PARSE_APP_ID;

    const api = new ParseServer({
        databaseURI: process.env.PARSE_MONGO || 'mongodb://localhost:27017/dev',
        // cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
        appId: sharedInstance.appId,
        masterKey: sharedInstance.masterKey,
        serverURL: process.env.PARSE_PUBLIC_URL || `http://localhost:${process.env.PORT || 8080}/parse`,
        publicServerURL: process.env.PARSE_PUBLIC_URL || `http://localhost:${process.env.PORT || 8080}/parse`,
        filesAdapter: process.env.PARSE_ENABLE_FILE ? new S3Adapter(
            Env.require('S3_ACCESS_KEY'),
            Env.require('S3_SECRET_KEY'),
            Env.require('S3_BUCKET'),
            {
                directAccess: true
            }
        ) : new FileSystemAdapter({
            filesSubDirectory: '/var/parse/file'
        })
    });
    sharedInstance.server.use('/parse', api);

}

module.exports = { config };
