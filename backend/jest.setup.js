require('dotenv').config(); // Ensure this is the first line in jest.setup.js
process.env.VERBOSE = 'true'; // Set VERBOSE explicitly for tests
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const logger = require('./utils/logger'); // Import your logger
const seed = require('./utils/seed'); // Adjusted path

// Global variable to track the session store if used
let mongoStore;


// Suppress stack traces during logs in tests
global.console.log = (...args) => {
    const filteredArgs = args.map(arg => {
        if (typeof arg === 'string') {
            return arg.replace(/at .*?(\n|$)/g, '').trim();
        }
        return arg;
    });
    process.stdout.write(`${filteredArgs.join(' ')}\n`);
};

global.console.warn = (...args) => {
    const filteredArgs = args.map(arg => {
        if (typeof arg === 'string') {
            return arg.replace(/at .*?(\n|$)/g, '').trim();
        }
        return arg;
    });
    process.stderr.write(`${filteredArgs.join(' ')}\n`);
};

global.console.error = (...args) => {
    const filteredArgs = args.map(arg => {
        if (typeof arg === 'string') {
            return arg.replace(/at .*?(\n|$)/g, '').trim();
        }
        return arg;
    });
    process.stderr.write(`${filteredArgs.join(' ')}\n`);
};

// Hook to log and clean up after tests
let currentTestPassed = false; // Track test result manually

beforeEach(() => {
    currentTestPassed = false; // Reset for each test
    const currentTestName = expect.getState().currentTestName;
    logger.test(`🧪 Starting test: ${currentTestName}`, 'info');
});

// afterEach(() => {
//     const currentTestName = expect.getState().currentTestName;
//     if (currentTestPassed) {
//         // logger.test(`✅ Test passed: ${currentTestName}`, 'success');
//     } else {
//         // logger.test(`❌ Test failed: ${currentTestName}`, 'failure');
//     }
// });

beforeAll(async () => {
    logger.test('⚙️ Setting up before all tests', 'info');
    await seed(); // Call the seed script to populate the test database

});

afterAll(async () => {
    logger.test('🧹 Cleaning up after all tests', 'info');
    
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        logger.test('✅ MongoDB connection closed', 'success');
    }

    if (mongoStore) {
        await mongoStore.client.close();
        logger.test('✅ Session store client closed', 'success');
    }
});
