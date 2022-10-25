const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/profile', userRoutes);
router.use('/dashboard', blogRoutes);

module.exports = router;