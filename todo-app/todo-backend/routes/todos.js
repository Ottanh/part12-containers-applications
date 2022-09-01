const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { setAsync, getAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const old_count = await getAsync('added_todos')
  const new_count = old_count !== 'NaN' ? parseInt(old_count) + 1 : 1;
  await setAsync('added_todos', new_count);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/',  async (req, res) => {
  const todo = req.todo;
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo;
  const text = req.body.text;
  const done = req.body.done;
  if(text){
    todo.text = text;
  }
  if(done !== undefined){
    todo.done = done;
  }
  res.send(await todo.save()); 
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
