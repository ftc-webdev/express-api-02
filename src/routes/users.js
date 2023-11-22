import express from 'express'
const router = express.Router();

const users = [
  {name: 'Timmy'},
  {name: 'Tom'},
  {name: 'Dick'},
  {name: 'Harriet'},
  {name: 'Mary'},
] 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    users 
  });
});

export default router
