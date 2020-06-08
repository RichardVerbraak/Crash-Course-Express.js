const express = require('express')
const router = express.Router()
const members = require('../../Members')

// No need to specify the route /api/members since it's moved now

// If the server gets a 'get' request with this url > serve this file
// Express will stringify it to json data already with .json
router.get('/', (req, res) => {
	res.json(members)
})

// Get single member
// Some method checks if atleast one element passes the test in the callback function
// Give a status of 400 when not found and tack on a msg with it
router.get('/:id', (req, res) => {
	const found = members.some((member) => {
		return member.id === parseInt(req.params.id)
	})

	if (found) {
		res.json(
			members.filter((member) => {
				return member.id === parseInt(req.params.id)
			})
		)
	} else {
		res.status(400).json({ msg: `No member with the id of: ${req.params.id}` })
	}
})

module.exports = router
