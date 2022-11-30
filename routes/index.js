const router = require('express').Router();

const apiRoutes = require('./api/index.js');

router.use('/api', apiRoutes);

// router.use((res) => {
//     res.status(404).send("you have a 404")
// });

module.exports = router;