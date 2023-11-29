const apiKey="duffel_test_Vv4A0ZMBCW92TyRL1EErp2C21CD4AWLBqOs2gCXEjZH"
const url = "https://api.duffel.com/air/"

const getOptions = (args) => {
  const defaults = {
    method: "POST",
    headers: {
      "Accept-encoding" : "gzip",
      "Content-Type": "Application/json",
      authorization: `Bearer ${apiKey}`,
      "Duffel-Version": "v1",
    },
  }
  return { ...defaults, ...args }
}

const endpoints = {
  search: {
    async get (body) {
            
      const duffelBody = {
        data: {
          slices: [ 
            {
              origin: body.sourceAirportCode,
              destination: body.destinationAirportCode,
              departure_date: body.departureDate,
            }
          ],
          passengers: body.passengers
        }
      } 


      const options = getOptions({ body : JSON.stringify(duffelBody)})
      
      let res = await fetch(`${url}/offer_requests?return_offers=false`, options)
      const offerRequest = await res.json()
      console.log("offer request", offerRequest)
      
      return offerRequest

    
    },
  },
  offers: {
    async get (id) {
    
      const options = getOptions({method: "GET"})      
      const path = `${url}/offers?offer_request_id=${id}&limit=10&sort=total_amount`
      console.log("path", path)
      const res = await fetch(path, options)
      const offers = await res.json()
      console.log("offers", offers)

      return offers
    
    }
  }

}

export default endpoints