import express from 'express'
import amazonaws from '../apis/amazonaws.js'

const router = express.Router();

// this is NOT really a useful endpoint
router.get('/ip', async (req, res, next) => {
  console.log("amazonaws/ip")
  const data = await amazonaws.ip.get()
  res.send(data)
})

export default router