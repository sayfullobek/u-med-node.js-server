var router = require('express').Router();

router.use('/auth', require('./authRoute'))
router.use('/diseases', require('./diseasesRoute'))

module.exports = router;
