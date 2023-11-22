import amazonaws from './amazonaws.js'

const endpoints = {
  location: {
    async get () {
      const ip = await amazonaws.ip.get()

      // https://api.ip2location.io/?key=3E17E9E064E03559313967D3D809147C&ip=80.233.45.22

      const apiKey = "3E17E9E064E03559313967D3D809147C"
      const url = "https://api.ip2location.io/"
      
      const res = await fetch(`${url}?key=${apiKey}&ip=${ip}`)
      const data = await res.json()
      // console.log("data.geoLocateIp", data)
      return data
    
    }
  }
}

export default endpoints