const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 2,
    message: "Too many requests come from this IP address, Please try again later!"
});

console.log(rateLimiter);

module.exports = rateLimiter;