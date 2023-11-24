import amazonaws from './amazonaws.js'
import ip2location from './ip2location.js'
import aviationReferenceDataApi from './aviationReferenceDataApi.js'
import airports from './airportSearch.js'

export default (app, baseUrl) => {

  app.use(`${baseUrl}/airports`, airports)
  app.use(`${baseUrl}/amazonaws`, amazonaws)
  app.use(`${baseUrl}/ip2location`, ip2location)
  app.use(`${baseUrl}/aviationReferenceDataApi`, aviationReferenceDataApi)

}
