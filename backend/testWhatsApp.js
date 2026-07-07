require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

// Send test WhatsApp to your number
// Using the number from the .env SMTP_USER email prefix + Indian code
// You can change the toNumber below to your actual number
const toNumber = 'whatsapp:+919876543210'; // <-- WILL BE REPLACED

client.messages.create({
  body: '✅ MediSlot AI Test: Your WhatsApp notification system is working!',
  from: fromNumber,
  to: toNumber
}).then(msg => {
  console.log('✅ Message sent! SID:', msg.sid, '| Status:', msg.status);
}).catch(err => {
  console.log('❌ Failed to send!');
  console.log('Error Code:', err.code);
  console.log('Error Message:', err.message);
  if (err.code === 21408) {
    console.log('\n⚠️  CAUSE: Your phone number is not registered in Twilio sandbox.');
    console.log('FIX: Open WhatsApp on your phone and send this message:');
    console.log('     "join <sandbox-keyword>" to +14155238886');
    console.log('     (Find your sandbox keyword at: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn)');
  }
  if (err.code === 63007) {
    console.log('\n⚠️  CAUSE: WhatsApp channel not configured or sandbox not active.');
  }
  if (err.code === 21211) {
    console.log('\n⚠️  CAUSE: Invalid phone number format.');
  }
});
