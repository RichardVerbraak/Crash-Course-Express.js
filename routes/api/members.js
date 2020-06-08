const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')

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

// Create member
// Posting a new member to the server (hardcoded data)
// Normally you would just have a database with the members and push it onto there instead of having the members data here
router.post('/', (req, res) => {
	// Create hardcoded new member
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		active: 'active',
	}

	// To mock if a name/email didn't get passed in
	if (!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: 'Please include a name and email' })
	}

	// Push onto array
	members.push(newMember)

	// Return as a response all the members
	res.json(members)
})

// Update member
// Make a put request (normally to a DB) and send along the name and email (the body aka the content)
// Need to loop again to get access to member.name and member.email because the some() method only returns a boolean and that's it
router.put('/:id', (req, res) => {
	// Look if the member exists based on condition, returns true if so
	const found = members.some((member) => {
		return member.id === parseInt(req.params.id)
	})

	// If found, store the updated info in a variable called updatedMember
	// Loop through the members and if it's ID matches the param then update it's name/email if there was one passed along in the body, else keep it the same
	if (found) {
		const updatedMember = req.body
		members.forEach((member) => {
			if (member.id === parseInt(req.params.id)) {
				member.name = updatedMember.name ? updatedMember.name : member.name
				member.email = updatedMember.email ? updatedMember.email : member.email

				res.json({ msg: 'Member updated', member })
			}
		})
	} else {
		res.status(400).json({ msg: `No member with the id of: ${req.params.id}` })
	}
})

module.exports = router
