// Database fetch calls from User Model

const router = require('express').Router();
const { User } = require('../../models');

const serializeUser = (userData) => {
  const user = userData.get({ plain: true });
  delete user.password;
  return user;
};

// CREATE new user
// When Form Sign Up is clicked, this grabs that data and inserts "req" with User model into Database
// api/users
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;
      res.status(201).json({ user: serializeUser(dbUserData) });
    });
  } catch (err) {
    console.error('POST /api/users error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
// When login form is submitted this gets the info from the form and 
// trys match the form email with Database email is. 
// api/users/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // using instance from User model to check if info from form input is the same as password connected to email in Database
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // If email and password is found in Database and are correctly written change the session logged_in to true 
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;

      res
        .status(200)
        .json({ user: serializeUser(dbUserData), message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error('POST /api/users/login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout
// api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
