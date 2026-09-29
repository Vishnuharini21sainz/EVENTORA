require('dotenv').config();
const app = require('../../api');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`EVENTORA API running on http://localhost:${PORT}`);
  console.log('Enquiries →', process.env.EVENTORA_OFFICE_EMAIL || 'vishnuharini07@gmail.com');
  console.log('WhatsApp → +91', process.env.EVENTORA_OFFICE_PHONE || '9940058091');
});
