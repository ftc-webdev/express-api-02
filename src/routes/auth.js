import express from 'express'
import auth from '../apis/auth.js'

const router = express.Router();

router.post('/register/', async (req, res) => {
  const body = req.body
  console.log("auth/register", body)
  const data = auth.register(body)
  // console.log("data", data)
  res.send(JSON.stringify(data))
})

router.post('/login/', async (req, res, next) => {
  const body = req.body
  console.log("auth/login", body)
  try {
    const data = auth.login(body)
    // console.log("data", data)
    res.send(JSON.stringify(data))  
  } catch(e) {
    next(e)
  }
})

export default router