import express from 'express'
import service from '../apis/ip2location.js'

const router = express.Router();

router.get('/location/:ip', async (req, res, next) => {
  const ip = req.params.ip
  const data = await service.location.get(ip)
  res.send(data)
})

export default router