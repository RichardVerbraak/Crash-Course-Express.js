const moment = require('moment')

// Middleware function
// Middleware functions are functions that have access to the req and res object
// Next is used to go onto the next middleware function (?)
const logger = (req, res, next) => {
	console.log(
		`The URL is: ${req.protocol}://${req.get('host')}${
			req.originalUrl
		} and the time: ${moment().format()}`
	)
	next()
}

module.exports = logger
