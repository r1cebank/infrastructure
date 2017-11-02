/**
 * handlers
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

const AppSingleton = require('./appsingleton');
const Cleanup = require('./cleanup');

//  define a shared instance for global variables
const sharedInstance = AppSingleton.getInstance();

function onError(err) {
    console.log(err);
}

function onExit(err) {
    Cleanup.cleanup();
    process.exit(); // eslint-disable-line
}

module.exports = {
    onError,
    onExit
};
