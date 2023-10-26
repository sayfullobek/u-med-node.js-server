const router = require('express').Router();
const {diseasesController} = require('../controller');
const {verifyToken} = require('../config/tokenHandlers');

router.get('/', diseasesController.getAll);
router.post('/', diseasesController.create);
router.put('/:id', diseasesController.update);
router.delete("/:id", diseasesController.delete)

module.exports = router;