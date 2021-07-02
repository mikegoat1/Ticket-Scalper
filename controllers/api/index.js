const router = require('express').Router();

const eventRoutes = require('./eventRoutes')
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/event', eventRoutes); 

module.exports = router;
