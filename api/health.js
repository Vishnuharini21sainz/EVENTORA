const { OFFICE_EMAIL, OFFICE_PHONE } = require('./_lib');

module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'EVENTORA API',
    officeEmail: OFFICE_EMAIL,
    officePhone: OFFICE_PHONE,
    emailConfigured: Boolean(process.env.RESEND_API_KEY),
  });
};
