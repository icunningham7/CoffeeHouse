const router = require('express').Router();
const { User } = require('../../models');

// Create a new user route
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;

      res.status(200).send();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log('attempting login');
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
      
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!dbUserData || !validPassword) {
      res.status(401).json({ message: 'Incorrect Username or Password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;

        res.status(200).json({ user: dbUserData.username, message: 'Login Successful' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(202).end();
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
