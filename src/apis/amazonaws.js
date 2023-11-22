
const endpoints = {
  ip : {
    async get () {
      const res = await fetch("https://checkip.amazonaws.com/")
      const data = await res.text()
      // console.log("data.getIPFromAmazon", data)
      return data
    }
  }
}

export default endpoints