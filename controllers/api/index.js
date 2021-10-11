const router = require('express').Router();

const eventRoutes = require('./eventRoutes')
const userRoutes = require('./user-routes');

//api/users
router.use('/users', userRoutes);
//api/event
router.use('/event', eventRoutes); 

module.exports = router;
