import data from "./airports.json" assert { type : "json" }
const { airports } = data

// this is a full text search
const search = async (text) => {
  text = text.toUpperCase()
  const results = airports.filter((airport) => (airport.name + airport.iata_code).toUpperCase().includes(text))
  return results
}

export default search