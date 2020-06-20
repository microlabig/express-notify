const express = require('express');
const router = express.Router();

const ctrl = require('../controllers');

router.all('*', (req, res, next) => {
  // для дебага в консоли
  console.log(`\n--- ${req.method} : ${req.url} ---`.toUpperCase());
  next();
});

router.get(/.*$/, ctrl.get);

router.post(/.*$/, ctrl.post);

router.delete('/api/*/:from', ctrl.delete);

module.exports = router;
