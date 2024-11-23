const router = require('express').Router();
const {Event} = require('../../models');

//api/event
//POST Event Values
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
    console.log(eventData)
  } catch (err) {
    res.status(400).json(err);
  }
});

//api/event
//GET Event Values

router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll()
    res.status(200).json(eventData);
    console.log(eventData)
  } catch (err) {
    res.status(400).json(err)
  }
});



module.exports = router;