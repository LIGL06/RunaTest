const path = require('path');
const {spawn} = require('child_process');

const nodemon = spawn('node', ['node_modules/nodemon/bin/nodemon.js', 'tasks/init.js', '--watch', 'src/server'], {
    cwd: path.join(__dirname, '../')
});
nodemon.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
});
nodemon.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
});

const webpack = spawn('node_modules/webpack-dev-server/bin/webpack-dev-server.js', {
    cwd: path.join(__dirname, '../')
});
webpack.stdout.on('data', (chunk) => {
    process.stdout.write(chunk);
});
webpack.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
});
