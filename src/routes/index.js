import users from './users.js'

export default (app) => {
  app.use('/api/v1/users', users);
}

