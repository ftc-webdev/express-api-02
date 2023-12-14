import amazonaws from './amazonaws.js'
import ip2location from './ip2location.js'
import aviationReferenceDataApi from './aviationReferenceDataApi.js'
import airports from './airportSearch.js'
import duffel from './duffel.js'
import auth from './auth.js'

import users from '../models/users.js'

import rest from './rest.js'

export default (app, baseUrl) => {

  app.use(`${baseUrl}/amazonaws`, amazonaws)
  app.use(`${baseUrl}/ip2location`, ip2location)
  app.use(`${baseUrl}/aviationReferenceDataApi`, aviationReferenceDataApi)
  app.use(`${baseUrl}/airports`, airports)
  app.use(`${baseUrl}/duffel`, duffel)

  app.use(`${baseUrl}/auth`, auth)

  app.use(`${baseUrl}/users`, rest(users, 'cruds'))
}
