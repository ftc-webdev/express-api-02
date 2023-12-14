/*
  this is the auth service
*/

import users from '../models/users.js'

const register = (user) => {
  user = users.create(user)
  return user
}

const login = (loginDetails) => {
  // console.log('users', users, users.getAll())
  // throw new Error("bloody error")
  const user = users.getAll().find((user) => user.userEmail === loginDetails.userEmail && user.userPassword === loginDetails.userPassword  )
  if(user) {
    console.log("user found", user)
    return user
  }
  else {
    const msg = `User email or password incorrect`
    console.log(msg)
    throw new Error(msg)
  } 
  // res.status(404)
  // return {status: "404", message:`User email or password incorrect`}
}

const service = {
  login,
  register
}

export default service