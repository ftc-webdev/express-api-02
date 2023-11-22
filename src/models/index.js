/*

  define the application data model(s)

  Note: in node, we cannot import a folder - ie auto find the index.js
  we must explicitly specific the folder AND the file to load PLUS the extension :-(

*/
import countries from './countries/index.js' // import index.js from countries folder
import airlines from './airlines.js'
import airports from './airports.js'

const models = {
  countries,
  airlines,
  airports,
}

export default models