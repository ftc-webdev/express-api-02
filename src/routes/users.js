import express from 'express'
const router = express.Router();

const users = [
  {name: 'Timmy'},
  {name: 'Tom'},
  {name: 'Dick'},
  {name: 'Harriet'},
  {name: 'Mary'},
] 
/* GET users listing. 
GET localhost:3001/api/v1/users/
*/
router.get('/', function(req, res) {
  console.log("req", req)
  res.json({
    users 
  });
});

// GET localhost:3001/api/v1/users/1
router.get('/:id', function(req, res) {
  console.log("req", req)
  const id = req.params.id
  const user = users[id]
  res.json({
    user
  });
});

export default router
