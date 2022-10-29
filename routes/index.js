const router = require('express').Router();

const apiRoutes = require('./API');

router.use('/API', apiRoutes);

router.use((res) => {
    res.status(404).send(<h1>Dude you got a 404 haha :(</h1>)
});

module.exports = router;