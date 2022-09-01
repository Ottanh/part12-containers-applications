const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

router.get('/', async (_, res) => {
  res.json({
    added_todos: await getAsync('added_todos')
  });
});

module.exports = router;