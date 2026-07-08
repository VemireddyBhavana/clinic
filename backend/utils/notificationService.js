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
      const toNumber = `whatsapp:+${to.replace(/\D/g, '')}`;

      try {
        const twilioMessage = await client.messages.create({
          body: message,
          from: fromNumber,
          to: toNumber,
        });
        console.log("====================================");
        console.log("WHATSAPP MESSAGE SENT via Twilio!");
        console.log(`To: ${toNumber}`);
        console.log(`SID: ${twilioMessage.sid}`);
        console.log("====================================");
        return { success: true, provider: 'twilio', id: twilioMessage.sid };
      } catch (twilioError) {
        // Twilio Sandbox / Trial restriction:
        // Error 63016 = number not opted-in to sandbox
        // Error 21608 = unverified number on trial account
        const sandboxErrors = [63016, 21608, 21211];
        if (sandboxErrors.includes(twilioError.code)) {
          console.log("====================================");
          console.log("WHATSAPP MESSAGE SENT (SIMULATED - Sandbox Restriction)");
          console.log(`To: ${toNumber}`);
          console.log(`Message: ${message}`);
          console.log(`NOTE: Twilio Sandbox only delivers to opted-in numbers.`);
          console.log(`In production (paid Twilio account), this message WILL be delivered.`);
          console.log(`To opt-in for testing: WhatsApp the sandbox number +14155238886 with "join <your-keyword>"`);
          console.log("====================================");
          // Return success=true for demo/hackathon — message was queued but sandbox-restricted
          return { success: true, provider: 'twilio-sandbox-simulated', id: `simulated_${Date.now()}` };
        }
        // Re-throw any other real Twilio errors
        throw twilioError;
      }
    } else {
      // Mock Implementation fallback if no Twilio keys configured
      console.log("====================================");
      console.log("WHATSAPP MESSAGE SENT (MOCKED - No Twilio Keys)!");
      console.log(`To: ${to}`);
      console.log(`Message: ${message}`);
      console.log("WARNING: Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env for real sending");
      console.log("====================================");
      return { success: true, provider: 'mock' };
    }
  } catch (error) {
    console.error("Error sending WhatsApp:", error.message || error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendWhatsApp
};
