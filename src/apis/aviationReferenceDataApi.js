
const aviationReferenceDataSearch = async (code, endpoint) => {

  const url = `https://aviation-reference-data.p.rapidapi.com/${endpoint}/${code}`;
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '43b67899b8msh628d113745d1ea3p1f3862jsn458a8944bd33',
      'X-RapidAPI-Host': 'aviation-reference-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log('aviationRefeneceDataSearch', endpoint, code, result);
    return result
  } catch (error) {
    console.error(error);
  }

}

const airlines = {
  async get (code) { 
    return await aviationReferenceDataSearch(code, "airline" ) 
  }
}

const airports = {
  async get (code) { 
    return await aviationReferenceDataSearch(code, "airports" ) 
  }
}

const countries = {
  async get (code) { 
    return await aviationReferenceDataSearch(code, "countries" ) 
  }
}


const endpoints = {
  airlines,
  airports,
  countries,
}

export default endpoints
