const VERBOSE = process.env.VERBOSE === 'true';

const logger = {
    log: (message, data = null) => {
        if (VERBOSE) {
            console.log(`✨ [LOG]: ${message}`);
            if (data) {
                console.dir(data, { depth: null }); // Log objects deeply
            }
        }
    },
    success: (message, data = null) => {
        if (VERBOSE) {
            console.log(`✅ [SUCCESS]: ${message}`);
            if (data) {
                console.dir(data, { depth: null });
            }
        }
    },
    warning: (message, data = null) => {
        if (VERBOSE) {
            console.warn(`⚠️ [WARNING]: ${message}`);
            if (data) {
                console.dir(data, { depth: null });
            }
        }
    },
    error: (message, error = null) => {
        console.error(`❌ [ERROR]: ${message}`);
        if (VERBOSE && error) {
            console.error(error.stack || error);
        }
    },
    action: (action, data = null) => {
        if (VERBOSE) {
            console.log(`🚀 [ACTION]: ${action}`);
            if (data) {
                console.dir(data, { depth: null });
            }
        }
    },
};

module.exports = logger;
