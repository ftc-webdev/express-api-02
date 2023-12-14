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

router.post('/orders/', async (req, res) => {
  const body = req.body

  console.log("duffel/orders", body)
  const data = await duffel.orders.get(body)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

router.post('/payments/', async (req, res) => {
  const body = req.body

  console.log("duffel/payments", body)
  const data = await duffel.payment_intents.create(body)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

router.get('/payments/:id', async (req, res) => {
  const id = req.params.id

  const data = await duffel.payments.confirm(id)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

router.get('/test/:origin?/:dest?', async (req, res) => {
  const {origin, dest} = req.params
  console.log("airports", origin, dest)
  const data = await duffel.test(origin, dest)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

export default router