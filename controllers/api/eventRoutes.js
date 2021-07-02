const router = require('express').Router();
const { Event } = require('../../models');

//api/event
//POST Event Values
router.post('/', async (req, res) => {
    try {
      console.log(req.body)
      const eventData = await Event.create({
        ...req.body,
        // user_id: req.session.user_id,
      });
  
      res.status(200).json(eventData);
      console.log(eventData)
    } catch (err) {
      res.status(400).json(err);
    }
});
  

module.exports = router;