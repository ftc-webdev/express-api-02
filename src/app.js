import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes/index.js'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())

routes(app)


export default app
