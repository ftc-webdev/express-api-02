import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url' // ES5 problem with __dirname
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from './routes/index.js'

var app = express();

// path to get around problem of __dirname not being available in ES5 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static("public"))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())

routes(app)

const urlPath = path.join(__dirname, '..', 'public')

app.use(express.static(urlPath));
/*
  handle the static website as well as the api paths
*/
app.get('/*', function (req, res) {
  res.sendFile(path.join(urlPath, 'index.html'));
})
/*
  the app error handler
*/
// app.use((err, req, res, next) => {
//   try {
//     console.log("App Error", err)
//     res.send(err)  
//   } catch(e) {
//     res.send("App Catch", e)  
//   }
// })


export default app
