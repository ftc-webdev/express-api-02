import express from 'express'
import search from './airports/index.js'

const router = express.Router();

router.get('/search/:text', async (req, res, next) => {
  const text = req.params.text
  console.log("airports/search", text)
  const data = await search(text)
  console.log("data", data)
  res.send(JSON.stringify(data))
})

export default router