const links = require('docker-links').parseLinks(process.env);
const replace = require('replace-in-file');
const env = require('require-env');
if (!links.parse) {
    console.error('You must name your parse link as parse!');
} else {
    const options = {
        files: 'dashboard-config.json',
        from: [
            '{HOST}',
            '{PORT}',
            '{APP_ID}',
            '{MASTER_KEY}',
            '{APP_NAME}',
            '{APP_ICON}',
            '{APP_USER}',
            '{APP_PASSWORD}'
        ],
        to: [
            links.parse.hostname,
            links.parse.port,
            process.env.PARSE_ENV_APP_ID,
            process.env.PARSE_ENV_MASTER_KEY,
            process.env.PARSE_ENV_APP_NAME,
            process.env.PARSE_ENV_APP_ICON || 'default.png',
            process.env.PARSE_ENV_APP_USER || 'username',
            process.env.PARSE_ENV_APP_PASSWORD || 'password',
        ],
    };
    try {
        const changes = replace.sync(options);
        console.log('Modified files:', changes.join(', '));
    } catch (error) {
        console.error('Error occurred:', error);
    }
}