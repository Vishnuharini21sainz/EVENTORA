module.exports = (req, res) => {
  res.status(200).json({ ok: true, service: 'EVENTORA API', message: 'Use /api/health, /api/events or /api/caterers.' });
};
