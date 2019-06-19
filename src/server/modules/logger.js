import Winston from 'winston';

const logger = Winston.createLogger({
    transports: new Winston.transports.Console({
        format: Winston.format.combine(
            Winston.format.colorize(),
            Winston.format.simple()
        )
    })
});

export default logger;
