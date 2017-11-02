/**
 * cleanup
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

const AppSingleton = require('./appsingleton');


function cleanup() {
    const sharedInstance = AppSingleton.getInstance();
    sharedInstance.log.info({ message: 'cleaning started' });
    sharedInstance.log.info({ message: 'cleaning complete' });
}

module.exports = { cleanup };
