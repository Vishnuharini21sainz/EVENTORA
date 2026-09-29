const { OFFICE_EMAIL, OFFICE_PHONE } = require('./_lib');

module.exports = (req, res) => {
  res.status(200).json({
    email: OFFICE_EMAIL,
    phone: OFFICE_PHONE,
    whatsapp: `https://wa.me/91${OFFICE_PHONE}`,
  });
};
