const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes')

router.use('/user', userRoutes);

router.use('/thoughts', thoughtsRoutes);

module.exports = router;