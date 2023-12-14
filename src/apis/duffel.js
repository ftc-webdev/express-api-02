const apiKey="duffel_test_Vv4A0ZMBCW92TyRL1EErp2C21CD4AWLBqOs2gCXEjZH"

// most requests use /air/ endpoint, but /payments/ also an option
const url = (endpoint = "air") => `https://api.duffel.com/${endpoint}/`


const isoDate = (d) => {
  if (!d) d = new Date()
  const str = d.toISOString()
  return str.substring(0, 10)
} 
const tmw = (d) => {
  if (!d) d = new Date()
  d.setDate(d.getDate() + 1)
  return isoDate(d)
}

const simplify = {
  offers (offers) {
    // console.log("simplify", offers)
    // walk across the array simplifying the response objects
    const data = offers.map(offer => {
      
      let { id, total_currency, total_amount, 
        slices, owner: airline} = offer 

      slices = simplify.slices(slices)
      airline = simplify.airline(airline)
      return {
        id, 
        total_currency,
        total_amount,
        slices,
        airline,
      }
    })

    const passengers = offers[0].passengers
    return {
      passengers,
      offers: data,
    }

  },
  slices (slices) {
    return slices.map((slice => {
      let { id, origin, destination,
         duration, segments } = slice
      
      const source = simplify.airport(origin)
      destination = simplify.airport(destination)
      segments = simplify.segments(segments)
      return {
        id,
        source,
        destination,
        duration,
        segments,
      }
    }))
  },
  segments (segments) {
    return segments.map((segment) => {
      const { stops, origin_terminal, 
        operating_carrier_flight_number: flight_number, 
        distance, duration, destination_terminal,
        departing_at, arriving_at, aircraft  } = segment

      return {
        stops,  origin_terminal, 
        flight_number, 
        distance, duration, destination_terminal,
        departing_at, arriving_at, aircraft
      }
    })

  },
  airport (airport) {
    const { iata_code, name, iata_country_code: country_code } = airport
    return { iata_code, name, country_code }
  },
  airline (airline) {
    const { name, logo_symbol_url: logo_url, iata_code} = airline
    return {name, logo_url, iata_code }
  }
}


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
      
      let res = await fetch(`${url()}/offer_requests?return_offers=false`, options)
      const offerRequest = await res.json()
      console.log("offer request", offerRequest)
      
      return offerRequest

    
    },
  },
  offers: {
    async get (id) {
    
      const options = getOptions({method: "GET"})      
      const path = `${url()}/offers?offer_request_id=${id}&limit=10&sort=total_amount`
      console.log("path", path)
      const res = await fetch(path, options)
      const data = await res.json()
      const offers = simplify.offers(data.data)
      console.log("offers", offers)

      return offers
    
    }

  },
  orders: {
    async get (data) {
      const duffelData = {
        data
      }
      const options = getOptions({ body : JSON.stringify(duffelData)})      
      const path = `${url()}/orders`
      const res = await fetch(path, options)
      const order = await res.json()
      // const offers = simplify.offers(data.data)
      // console.log("offers", data)

      return order
    
    }
  },
  payment_intents: { // NB: it has its own duffel endpoint /payments/ not /air/
    async create (data) {  // {amount:###, currency:"GBP" }
      const duffelData = {
        data
      }
      const options = getOptions({ body : JSON.stringify(duffelData)})      
      const path = `${url("payments")}/payment_intents`
      const res = await fetch(path, options)
      const pi = await res.json()

      return pi
    
    },
    // https://api.duffel.com/payments/payment_intents/pit_00009hthhsUZ8W4LxQgkjo/actions/confirm
    async create (id) {  // {amount:###, currency:"GBP" }
      const options = getOptions({ method: "GET" })      
      const path = `${url("payments")}/payment_intents/${id}/actions/confirm`
      const res = await fetch(path, options)
      const pi = await res.json()

      return pi
    
    },
    
  },
  
  /*
    lets see if we can daisy chain the two above methods
  */
  async test (origin, dest) {
    const body = {
      sourceAirportCode: origin || "ORK",
      destinationAirportCode: dest || "LHR",
      departureDate: tmw(),
      passengers: [
        {
          type: "adult"
        }
      ]
    }
    const offerRequest = await endpoints.search.get(body)
    const offers = await endpoints.offers.get(offerRequest.data.id)
    return offers
  }

}

export default endpoints