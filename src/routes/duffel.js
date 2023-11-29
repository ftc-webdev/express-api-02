import express from 'express'
import duffel from '../apis/duffel.js'

const router = express.Router();


router.post('/search/', async (req, res) => {
  const body = req.body

  console.log("duffel/search", body)
  const data = await duffel.search.get(body)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

router.get('/offers/:id', async (req, res) => {
  const id = req.params.id

  const data = await duffel.offers.get(id)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

export default router