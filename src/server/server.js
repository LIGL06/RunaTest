import http from 'http';
import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import colors from 'colors';
import logger from './modules/logger';
import Database from './modules/Database';
import router from './router';

const Server = {

    /**
     * Initializes the server
     * @return {Promise}
     */
    async init() {
        await Database.init();
        this.app = new Koa();
        this.app.silent = true;
        this.server = http.createServer(this.app.callback());
        this.bindRouter();
        this.bindSPA();
        this.handleAppErrors();
        this.handleExits();
        this.start();
    },

    /**
     * Binds application router
     */
    bindRouter() {
        this.app.use(koaBody({multipart: true}));
        this.app.use(router.routes());
        this.app.use(router.allowedMethods());
    },

    /**
     * Binds the static public/ folder to serve the frontend on production
     */
    bindSPA() {
        if (process.env.NODE_ENV !== 'production') return;
        const indexPath = path.join(__dirname, '../../public/index.html');
        const publicPath = path.join(__dirname, '../../public');
        const index = fs.readFileSync(indexPath);
        this.app.use(koaStatic(publicPath));
        this.app.use(async (ctx) => {
            ctx.body = index.toString();
        });
    },

    /**
     * Handles errors and sends them to logging service
     */
    handleAppErrors() {
        this.app.on('error', (err, ctx) => {
            logger.error(`Application Error: ${err.name} @ ${ctx.method}:${ctx.url}`);
            logger.error(err.stack);
        });
    },

    /**
     * Starts the http server
     */
    start() {
        this.server.listen(process.env.PORT, () => {
            logger.info(colors.green(`● API server running on [::]:${process.env.PORT}`));
        });
    },

    /**
     * Handle process exits and gracefully shut down server
     */
    handleExits() {
        process.on('SIGINT', () => {
            logger.info('Shutting down gracefully...');
            this.server.close(() => {
                logger.info(colors.red('Web server closed'));
                process.exit();
            });
        });
    }

};

export default Server;
