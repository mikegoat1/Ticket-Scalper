const router = require('express').Router();
const { seatgeekClientId, ticketmasterApiKey } = require('../../config');
const allowedTicketmasterSorts = new Set(['relevance,desc', 'date,asc', 'date,desc', 'name,asc']);

// GET /api/proxy/events — proxies SeatGeek geo-based concert listing
router.get('/events', async (req, res) => {
  try {
    const url = new URL('https://api.seatgeek.com/2/events');
    url.search = new URLSearchParams({
      client_id: seatgeekClientId,
      geoip: 'true',
      per_page: '50',
      sort: 'score.desc',
    }).toString();
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
  const keyword = String(req.query.q || '').trim();
  const city = String(req.query.city || '').trim();
  const category = String(req.query.category || '').trim();
  const startDate = String(req.query.startDate || '').trim();
  const endDate = String(req.query.endDate || '').trim();
  const requestedSort = String(req.query.sort || 'relevance,desc').trim();
  const sort = allowedTicketmasterSorts.has(requestedSort) ? requestedSort : 'relevance,desc';

  try {
    const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
    const params = new URLSearchParams({
      size: '15',
      apikey: ticketmasterApiKey,
      sort,
    });

    if (keyword) params.set('keyword', keyword);
    if (city) params.set('city', city);
    if (category) params.set('classificationName', category);
    if (startDate) params.set('startDateTime', `${startDate}T00:00:00Z`);
    if (endDate) params.set('endDateTime', `${endDate}T23:59:59Z`);

    url.search = params.toString();
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
