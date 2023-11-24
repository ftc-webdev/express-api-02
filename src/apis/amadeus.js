const url = "test.api.amadeus.com/v1"
const apiKey = "9wMIAmtlFsRzzwgAErCDqPrHyWPsAVNt"
const apikSecret = "qEJTkouE5961tRaE"
/*

  https://test.api.amadeus.com/v1/reference-data/locations?
  subType=CITY&
  keyword=cor&
  countryCode=IE&
  sort=analytics.travelers.score&
  view=FULL&
  page%5Boffset%5D=0&
  page%5Blimit%5D=10"
  

*/
const endpoints = {
  locations : {
    airportAndCities : "/reference-data/locations",
    airportOrCity: "/reference-data/locations/:id"
  }
} 