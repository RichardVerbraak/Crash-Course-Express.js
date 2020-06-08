const express = require('express')
const path = require('path')

const logger = require('./middleware/logger')

const app = express()

// Initialize middleware
// app.use(logger)

// Set Static Folder
// The server will now just serve the public files
app.use(express.static(path.join(__dirname, 'public')))

// Tells the server that this file below should be served/routed when the url is /api/members
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
