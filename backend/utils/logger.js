const VERBOSE = process.env.VERBOSE === 'true';

// Helper function to clean and format logged objects
const formatObject = (data) => {
    if (!data) return '';
    return JSON.stringify(data, null, 2) // Convert object to formatted JSON
        .replace(/"stack":\s?".*?"/g, ''); // Remove stack traces if present
};

const logger = {
    log: (message, data = null) => {
        if (VERBOSE) {
            console.log(`✨ [LOG]: ${message}`);
            if (data) {
                console.log(`📝 Data: ${formatObject(data)}`);
            }
        }
    },
    success: (message, data = null) => {
        if (VERBOSE) {
            console.log(`✅ [SUCCESS]: ${message}`);
            if (data) {
                console.log(`🟢 Data: ${formatObject(data)}`);
            }
        }
    },
    warning: (message, data = null) => {
        if (VERBOSE) {
            console.warn(`⚠️ [WARNING]: ${message}`);
            if (data) {
                console.warn(`🟡 Data: ${formatObject(data)}`);
            }
        }
    },
    error: (message, error = null) => {
        console.error(`❌ [ERROR]: ${message}`);
        if (VERBOSE && error) {
            console.error(`🔴 Error: ${formatObject(error)}`);
        }
    },
    action: (action, data = null) => {
        if (VERBOSE) {
            console.log(`🚀 [ACTION]: ${action}`);
            if (data) {
                console.log(`🔵 Data: ${formatObject(data)}`);
            }
        }
    },
    test: (message, type = 'info') => {
        const types = {
            info: `🧪 [TEST]: ${message}`,
            success: `✅ [TEST PASSED]: ${message}`,
            failure: `❌ [TEST FAILED]: ${message}`,
        };
        console.log(types[type] || types.info);
    },
};

module.exports = logger;
