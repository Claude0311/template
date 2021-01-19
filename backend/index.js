import express from 'express'
import bodyParser from 'body-parser'
import DB from './model/db.js'
import api from './api/api'
import session from 'express-session'
import connect from 'connect-mongo'
import cors from "cors"
import history from 'connect-history-api-fallback'

const app = express()
DB.once('open',()=>{
	console.log('mongoDB connected')

	//post, get時的解碼json type
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(cors({
		origin: 'http://localhost:3000',
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
		credentials: true
	}))

	//session
	const MongoStore = connect(session)
	app.use(
		session({
			name: 'template',
			secret: 'jgevslv', // 用来對session id相關的cookie進行簽名，建議128byte亂碼
			store: new MongoStore({mongooseConnection: DB}),
			saveUninitialized: false, //prevent race conditions
			resave: false,
			cookie: {maxAge: 60 * 60 * 1000}
		})
	)
	
	if(process.env.NODE_ENV==='production'){
		app.use('/api',api)
		app.use(history())
		const buildPath = path.join('.', '..', 'frontend','build')
		app.use(express.static(buildPath))
		app.get('/', (req, res) => {
			res.sendFile(path.join('.','..','frontend','build','index.html')) // for icon showing
		})
	}else{
		app.use(api)
	}
	
	const port = process.env.PORT || 4000
	app.listen(port,  () => {
		console.log('server connect')
		console.log(`port name: ${port}`)
	})
})