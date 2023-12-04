const apiKey="duffel_test_Vv4A0ZMBCW92TyRL1EErp2C21CD4AWLBqOs2gCXEjZH"
const url = "https://api.duffel.com/air/"

const simplify = {
  offers (offers) {
    // console.log("simplify", offers)
    // walk across the array simplifying the response objects
    const data = offers.map(offer => {
      
      let { total_currency, total_amount, 
        slices, owner: airline} = offer 

      slices = simplify.slices(slices)
      airline = simplify.airline(airline)
      return {
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
      const data = await res.json()
      const offers = simplify.offers(data.data)
      console.log("offers", offers)

      return offers
    
    }
  }

}

export default endpoints