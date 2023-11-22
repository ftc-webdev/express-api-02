import users from './users.js'
import apis from './apis.js'

const baseUrl = "/api/v1"

export default (app) => {
  
  app.use(`${baseUrl}/users`, users)

  // wire up the apis to give each of them a route
  apis(app, baseUrl)

}

