var express = require('express');
var router = express.Router();
var dataDatesController = require('../controllers/dataDatesController.js');

/*
 * GET
 */
router.get('/', dataDatesController.list);

/*
 * GET
 */
router.get('/:id', dataDatesController.show);

/*
 * POST
 */
router.post('/', dataDatesController.create);

/*
 * PUT
 */
router.put('/:id', dataDatesController.update);

/*
 * DELETE
 */
router.delete('/:id', dataDatesController.remove);

module.exports = router;
