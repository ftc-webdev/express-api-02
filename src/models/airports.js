import apis from '../apis/index.js'

const Airports = () => {
  return {
    async get (code) {
      return await apis.aviationReferenceDataApi.airports.get(code)
    }
  }
}

const airports = Airports()

export default airports
