require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())

app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 365
	}
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

//auth
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

//cart
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

//search
app.get('/api/search', searchController.search)

//swag
app.get('/api/swag', swagController.read)


app.listen(SERVER_PORT, () => {
	console.log(`SOME CRAZY SHIZZ GOING ON, ON PORT ${SERVER_PORT}`)
})