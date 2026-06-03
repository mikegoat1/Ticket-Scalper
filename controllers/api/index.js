const router = require('express').Router();

const eventRoutes = require('./event-routes');
const userRoutes = require('./user-routes');
const proxyRoutes = require('./proxy-routes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/proxy', proxyRoutes);

module.exports = router;
