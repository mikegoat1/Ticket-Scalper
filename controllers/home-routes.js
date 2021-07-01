const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all info from ticketmaster
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      
    });

    const events = eventData.map((event) =>
      event.get({ plain: true })
    );

    res.render('homepage', {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one event
router.get('/event/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the event
    try {
      const eventData = await Event.findByPk(req.params.id, {
        include: [
          {
            model: Event,
            // Set the attributes for the info you want to display
            attributes: [
              'id',
              'venue',
              'price_range_min',
              'price_range_max',
              'start_date',
              'start_time',
            ],
          },
        ],
      });
      const events = eventData.get({ plain: true });
      res.render('detailResult', {
        ...events,
        logged_in: req.session.logged_in
      });
      } catch (err) {
      res.status(500).json(err);
      }
      };
    });


// POST Event Values
router.get('/event', async (req, res) => {
  try {
    console.log(req.body)
    const eventData = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(eventData);
    console.log(eventData)
  } catch (err) {
    res.status(400).json(err);
  }
});


// GET profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
