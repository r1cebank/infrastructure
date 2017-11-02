/**
 * index.js
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

//  Custom Library
const AppSingleton = require('./utils/appsingleton');

//  Application lifecycle
const Setup = require('./utils/setup');
const Startup = require('./utils/startup');
const Application = require('./utils/app');
const Handlers = require('./utils/handlers');

const sharedInstance = AppSingleton.getInstance();

(async function () { // eslint-disable-line

    //  AppSingleton Instance
    sharedInstance.startTime = new Date();

    /*!
    *  Ran configuration to setup Global, local variables
    */
    Setup.config();

    /*!
    *  await for the startup functions because these will be async
    */
    await Startup.beforeStart();

    /*!
     *  await for launch server script
     */
    await Application.start();

    /*!
     *  process handlers
     */

    // //  catches when process exits
    // process.on('exit', Handlers.onExit);

    //  catches ctrl+c
    process.on('SIGINT', Handlers.onExit);

}()).catch((error) => {
    if (sharedInstance.log) {
        sharedInstance.log.error({ message: 'application error', error });
    }
    Handlers.onError(error);
});
