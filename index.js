const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const members = require('./Members')

const app = express()

// Initialize middleware
// app.use(logger)

// Handlebars Middleware
// Handlebars is a JS templating engine meaning it connects the server data and template (HTML with said data) into a HTML document (views)
// Doing this so the server now makes use of handlebar
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Homepage route
// When receiving a request to the homepage /, render the index template and also pass along this info for it to render
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Members App',
		members,
	})
})

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set Static Folder
// The server will now just serve the public files
// This is not being used unless move above handlebars homepage route because handlebars is now serving an index file
// Normally both wouldnt be used
// Unless you have lets say a HTML page with a form that makes a post request and you would have something like app.post('/contact')
app.use(express.static(path.join(__dirname, 'public')))

// Tells the server that this file below should be served/routed when the url is /api/members
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
