/**
 * startup
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */
const Bunyan = require('bunyan');
const bunyantcp = require('bunyan-logstash-tcp');
const ReadableId = require('adjective-adjective-animal');

const AppSingleton = require('./appsingleton');
const createLogger = require('./log/createLogger');

async function beforeStart() {
    const sharedInstance = AppSingleton.getInstance();
    sharedInstance.serverId = await ReadableId(1);

    sharedInstance.bunyan = Bunyan.createLogger({
        name: sharedInstance.serviceName,
        serializers: Bunyan.stdSerializers,
        streams: [
            {
                stream: process.stdout,
                level: process.env.STDOUT_LEVEL || 'debug'
            },
            // {
            //     level: 'debug',
            //     type: 'raw',
            //     stream: bunyantcp.createStream({
            //         host: process.env.LOGSTASH_HOST || '127.0.0.1',
            //         port: process.env.LOGSTASH_PORT || 5000
            //     })
            // }
        ],
        index: `${sharedInstance.serviceName}-${sharedInstance.serverId}`
    });

    sharedInstance.log = createLogger(sharedInstance.bunyan);
}

module.exports = { beforeStart };
