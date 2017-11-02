/**
 * app.js
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */
/* eslint no-process-env: 0 */

// import Auth                 from './auth';
const Middlewares = require('../middlewares');
const AppSingleton = require('./appsingleton');

async function start() {
    const sharedInstance = AppSingleton.getInstance();

    // sharedInstance.server.post('/weather/bot', auth, Middlewares.bot);
    sharedInstance.server.get('/status', Middlewares.status);

    // Start server
    sharedInstance.server.listen(process.env.PORT || 8080);
    sharedInstance.log.info({ message: `Application started on ${sharedInstance.startTime}` });
    sharedInstance.log.info({ message: `App ID: [${sharedInstance.appId}] Master Key: [${sharedInstance.masterKey}]` });
}

module.exports = { start };
