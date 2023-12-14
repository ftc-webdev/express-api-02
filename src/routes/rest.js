/*
  this is a Restful implmentation for express router
*/

import express from 'express'
import search from './airports/index.js'

const router = express.Router();
// localhost:3001/api/v1/airports/search/LGW
// text = LGW

// need to provide a generic get handler
const endpoints = (service, cruds) => {

  if(cruds.toLowerCase().includes("c")) { // create
    router.post(`/`, async (req, res) => {
      const body = req.body
      console.log("POST", path, body)
      const data = await service.create(body)
      console.log("data", data)
      res.send(JSON.stringify(data))
    })
  } 
  if(cruds.toLowerCase().includes("r")) { // get
    router.get(`/:id`, async (req, res) => {
      const text = req.params.id
      console.log("id", id)
      const data = await service.get(id)
      console.log("data", data)
      res.send(JSON.stringify(data))
    })
    
  }
  if(cruds.toLowerCase().includes("u")) {  // endpoint.update = update

    router.put(`/`, async (req, res) => {
      const body = req.body
      console.log("PUT", path, body)
      const data = await service.update(body)
      console.log("data", data)
      res.send(JSON.stringify(data))
    })

  }
  if(cruds.toLowerCase().includes("d")) {   // endpoint.del = del
  
    router.delete(`/:id`, async (req, res) => {
      const text = req.params.id
      console.log("id", id)
      const data = await service.del(id)
      console.log("data", data)
      res.send(JSON.stringify(data))
    })
  
  }
  if(cruds.toLowerCase().includes("s")) {    // endpoint.getAll = getAll
  
    router.get(`/`, async (req, res) => {
      console.log("params", request.params)
      const data = await service.getAll(req.params)
      console.log("data", data)
      res.send(JSON.stringify(data))
    })
  
  }

  return router

}

export default endpoints
