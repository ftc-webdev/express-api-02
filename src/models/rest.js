/*
  This is a rest handler for lowdb
*/
import { JSONPreset } from 'lowdb/node'
// Read or create db.json
const defaultData = {}
const db = await JSONPreset('db.json', defaultData)

// name : named collection - an array
const rest = (name) => {
  if(!db.data[name]) {
    console.log(`no ${name} collection in db...creating`)
    db.data[name] = [] // create the collection of not exist
    db.write()
  }
  const data = db.data[name]
  // console.log("rest-data", db, data)

  const get = (id) => {
    return data[id]
  }
  const getAll = () => {
    return data
  }
  const del = (id) => {
    delete data[id]
    db.write()
    return data 
  }
  const update = (obj) => {
    data[obj.id] = obj
    db.write()
    return obj
  }
  const create = (obj) => {
    if(!obj.id) obj.id = data.length
    data[ obj.id ] = obj // naive solution, will reuse ids
    db.write()
    return obj

  }

  return {
    get, getAll, create, del, update, data
  }

}

export default rest