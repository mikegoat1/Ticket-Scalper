const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all info from ticketmaster
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [{model: Event,},],
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
    // If the user is logged in, allow them to view the gallery
    try {
      const eventData = await Gallery.findByPk(req.params.id, {
        include: [
          {
            model: Event,
            // Set the attributes for the info you want to display
            attributes: [
              'id',
              'title',
              'artist',
              'exhibition_date',
              'filename',
              'description',
            ],
          },
        ],
      });
      const events = eventData.get({ plain: true });
      console.log(events); 
      res.render('results', { events, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET profile
router.get('/profile',withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the painting
    try {
      const userData = await User.findByPk(req.session.user_id);

      const userEvents = userData.get({ plain: true });

      res.render('profile', { userEvents, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
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
