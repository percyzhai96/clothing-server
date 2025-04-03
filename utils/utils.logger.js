var log4js = require('log4js');

log4js.configure({
    appenders: {
        console: { type: 'console' },
        info: {
            type: 'file',
            filename: 'logs/info.log'
        },
        error: {
            type: 'file',
            filename: 'logs/error.log'
        }
    },
    categories: {
        default: {
            appenders: [ 'console','info' ],
            level: 'debug'
        },
        info: {
            appenders: ['info'],
            level: 'info'
        },
        error: {
            appenders: [ 'error', 'console' ],
            level: 'error'
        }
    }
});

/**
 * 日志输出 level为bug
 * @param { string } content
 */
exports.debug = ( content ) => {
    let logger = log4js.getLogger('debug')
    logger.level = 'debug'
    logger.debug(content)
}

/**
 * 日志输出 level为info
 * @param { string } content
 */
exports.info = ( content ) => {
    let logger = log4js.getLogger('info')
    logger.level = 'info'
    logger.info(content)
}

/**
 * 日志输出 level为error
 * @param { string } content
 */
exports.error = ( content ) => {
    let logger = log4js.getLogger('error')
    logger.level = 'error'
    logger.error(content)
}

