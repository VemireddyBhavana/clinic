const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Ethereal Email Setup for testing
// In production, you would use standard SMTP credentials
const sendEmail = async (to, subject, html) => {
  try {
    let transporter;
    
    // Use real SMTP if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback to Ethereal mock email for hackathon/development
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    let info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"MediSlot AI" <no-reply@medislot.ai>',
      to: to,
      subject: subject,
      html: html,
    });

    console.log("====================================");
    console.log("EMAIL SENT SUCCESSFULLY!");
    console.log("Message sent: %s", info.messageId);
    if (!process.env.SMTP_HOST) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log("WARNING: Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env for real email sending");
    }
    console.log("====================================");
    
    return { success: true, provider: process.env.SMTP_HOST ? 'smtp' : 'ethereal', id: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

const sendWhatsApp = async (to, message) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Twilio Sandbox Number
    
    if (accountSid && authToken) {
      const client = twilio(accountSid, authToken);
      const twilioMessage = await client.messages.create({
        body: message,
        from: fromNumber,
        to: `whatsapp:${to.replace(/\D/g, '')}` // Ensure numeric formatting
      });
      console.log("WhatsApp message sent successfully via Twilio: ", twilioMessage.sid);
      return { success: true, provider: 'twilio', id: twilioMessage.sid };
    } else {
      // Mock Implementation fallback if no keys
      console.log("====================================");
      console.log("WHATSAPP MESSAGE SENT (MOCKED)!");
      console.log(`To: ${to}`);
      console.log(`Message: ${message}`);
      console.log("WARNING: Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env for real sending");
      console.log("====================================");
      return { success: true, provider: 'mock' };
    }
  } catch (error) {
    console.error("Error sending WhatsApp:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendWhatsApp
};
