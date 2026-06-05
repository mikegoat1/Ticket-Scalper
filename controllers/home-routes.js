const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll();
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render('homepage', {
      events,
      is_homepage: true,
      logged_in: Boolean(req.session.logged_in),
    });
  } catch (err) {
    console.error('GET / error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET one event detail (requires login)
router.get('/detailResult/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!eventData) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const event = eventData.get({ plain: true });
    res.render('detailResult', {
      event,
      logged_in: true,
    });
  } catch (err) {
    console.error('GET /detailResult/:id error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET profile (requires login)
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });
    if (!userData) {
      return req.session.destroy(() => res.redirect('/login'));
    }
    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('GET /profile error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('login');
});

router.get('/homepage', (req, res) => {
  res.redirect('/');
});

module.exports = router;
