require('dotenv').config();
require('@babel/register');

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const logger = require('../src/server/modules/logger');
const server = require('../src/server/server');

const run = async () => {
    try {
        const pkg = fs.readFileSync(path.join(__dirname, '../package.json'));
        const {name, version} = JSON.parse(pkg);

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        const env = colors.yellow(process.env.NODE_ENV);

        logger.info(`○ ${name} v${version} ${env}`);
        logger.info(`○ Runtime: ${process.title} ${process.version}`);
        logger.info(`○ PID: ${process.pid}`);

        await server.init();
    } catch (err) {
        logger.error(err.stack);
        process.exit(1);
    }
};

run();
