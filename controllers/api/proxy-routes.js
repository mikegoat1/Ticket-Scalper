const router = require('express').Router();
const { seatgeekClientId, ticketmasterApiKey } = require('../../config');

// GET /api/proxy/events — proxies SeatGeek geo-based concert listing
router.get('/events', async (req, res) => {
  try {
    const url = `https://api.seatgeek.com/2/events?client_id=${seatgeekClientId}&geoip=true&per_page=50&sort=score.desc`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Upstream error from SeatGeek' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('SeatGeek proxy error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/proxy/search?q=<keyword> — proxies Ticketmaster keyword search
router.get('/search', async (req, res) => {
  const keyword = (req.query.q || '').replace(/\s/g, '%20');
  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?size=15&keyword=${keyword}&apikey=${ticketmasterApiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Upstream error from Ticketmaster' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Ticketmaster proxy error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
