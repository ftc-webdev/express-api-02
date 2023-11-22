import express from 'express'
import service from '../apis/aviationReferenceDataApi.js'

const router = express.Router();

router.get('/airlines/:id', async (req, res, next) => {
  const data = await service.airlines.get(req.params.id)
  res.send(data)
})

router.get('/airports/:id', async (req, res, next) => {
  const data = await service.airports.get(req.params.id)
  res.send(data)
})

router.get('/countries/:id', async (req, res, next) => {
  const data = await service.countries.get(req.params.id)
  res.send(data)
})
export default router

