const morgan = require('morgan');

// Create a Morgan logger middleware
const requestLogger = morgan('combined'); // You can use other formats like 'tiny', 'dev', 'common' based on your preference

// Export the middleware
module.exports = requestLogger;
