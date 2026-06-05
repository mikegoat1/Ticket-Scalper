const router = require('express').Router();
const { Event } = require('../../models');
const withAuth = require('../../utils/auth');

const requiredEventFields = ['name', 'venue', 'start_date', 'start_time', 'ticket_link'];

const normalizeEventPayload = (body, userId) => ({
  name: String(body.name || '').trim(),
  venue: String(body.venue || '').trim(),
  price_range_min: body.price_range_min || null,
  price_range_max: body.price_range_max || null,
  start_date: String(body.start_date || '').trim(),
  start_time: String(body.start_time || '').trim(),
  ticket_link: String(body.ticket_link || '').trim(),
  image_url: String(body.image_url || '').trim(),
  user_id: userId,
});

// POST /api/events
router.post('/', withAuth, async (req, res) => {
  try {
    const eventPayload = normalizeEventPayload(req.body, req.session.user_id);
    const missingFields = requiredEventFields.filter((field) => !eventPayload[field]);

    if (missingFields.length) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const [eventData, created] = await Event.findOrCreate({
      where: {
        user_id: req.session.user_id,
        ticket_link: eventPayload.ticket_link,
      },
      defaults: eventPayload,
    });

    res.status(created ? 201 : 200).json(eventData);
  } catch (err) {
    console.error('POST /api/events error:', err);
    res.status(400).json({ message: 'Could not create event' });
  }
});

// GET /api/events
router.get('/', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(eventData);
  } catch (err) {
    console.error('GET /api/events error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/events/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedRows = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedRows) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(204).end();
  } catch (err) {
    console.error('DELETE /api/events/:id error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
