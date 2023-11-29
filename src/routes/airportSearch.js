import express from 'express'
import search from './airports/index.js'

const router = express.Router();
// localhost:3001/api/v1/airports/search/LGW
// text = LGW
router.get('/search/:airport', async (req, res) => {
  const text = req.params.airport
  console.log("airports/search", text)
  const data = await search(text)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

export default router