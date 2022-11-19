const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const blogRoutes = require('./blogRoutes');

// Placing the GET homeRoutes and blogRoutes at this level gives a cleaner URL structure than nesting them under /api.
// Data modifying routes (PUT/POST/DELETE) will stay within the api folder structure
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blog', blogRoutes);

module.exports = router;