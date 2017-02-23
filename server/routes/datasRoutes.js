var express = require('express');
var router = express.Router();
var datasController = require('../controllers/datasController.js');

/*
 * GET
 */
router.get('/', datasController.list);

/*
 * GET
 */
router.get('/:id', datasController.show);

/*
 * POST
 */
router.post('/', datasController.create);

/*
 * PUT
 */
router.put('/:id', datasController.update);

/*
 * DELETE
 */
router.delete('/:id', datasController.remove);

module.exports = router;
