const { events, createEvent } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    let body = req.body || {};
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (_) { body = {}; }
    }
    try {
      const event = await createEvent(body);
      return res.status(201).json(event);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Unable to create event' });
    }
  }

  if (req.method === 'GET') {
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Application ID is required' });
    const event = events.get(id);
    if (!event) return res.status(404).json({ error: 'Application not found' });
    return res.status(200).json(event);
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
};
