const router = require('express').Router();
const { Event } = require('../../models');

// POST /api/events
router.post('/', async (req, res) => {
  try {
    const eventData = await Event.create({
      name: req.body.name,
      venue: req.body.venue,
      price_range_min: req.body.price_range_min,
      price_range_max: req.body.price_range_max,
      start_date: req.body.start_date,
      start_time: req.body.start_time,
      ticket_link: req.body.ticket_link,
      image_url: req.body.image_url,
    });
    res.status(200).json(eventData);
  } catch (err) {
    console.error('POST /api/events error:', err);
    res.status(400).json({ message: 'Could not create event' });
  }
});

// GET /api/events
router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll();
    res.status(200).json(eventData);
  } catch (err) {
    console.error('GET /api/events error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;