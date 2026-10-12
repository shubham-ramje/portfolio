const nodemailer = require('nodemailer');

/**
 * Creates and configures the nodemailer transporter.
 * Supports standard SMTP (e.g. Gmail, Brevo, SendGrid, Mailtrap)
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send contact notification to portfolio owner
 */
const sendContactNotification = async ({ name, email, phone, subject, message, createdAt }) => {
  const transporter = createTransporter();
  const targetEmail = process.env.CONTACT_EMAIL || 'ramjeshubham@gmail.com';
  const submissionDate = new Date(createdAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER || 'no-reply@portfolio.local'}>`,
    to: targetEmail,
    replyTo: email,
    subject: `New Message from ${name}: ${subject || 'Portfolio Inquiry'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 24px; color: #ffffff; }
          .header h2 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 0; font-size: 14px; opacity: 0.9; }
          .content { padding: 24px; }
          .field { margin-bottom: 16px; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 15px; color: #0f172a; font-weight: 500; }
          .message-box { background: #f1f5f9; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 4px; margin-top: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #334155; }
          .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Inquiry</h2>
            <p>Received from Shubham Ramje's Portfolio Website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Sender Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value">${phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject || 'General Inquiry'}</div>
            </div>
            <div class="field">
              <div class="label">Submission Timestamp</div>
              <div class="value">${submissionDate}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            Shubham Ramje Portfolio System • MERN Full Stack
          </div>
        </div>
      </body>
      </html>
    `,
  };

  if (!transporter) {
    console.log(`\n======================================================`);
    console.log(`[Email Simulation - SMTP Credentials Not Provided]`);
    console.log(`To: ${mailOptions.to}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Phone: ${phone || 'N/A'}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Date: ${submissionDate}`);
    console.log(`Message: \n${message}`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Notification sent successfully. Message ID: ${info.messageId}`);

    // Optionally send automated auto-reply confirmation to the sender
    try {
      await transporter.sendMail({
        from: `"Shubham Ramje" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thank you for reaching out, ${name}!`,
        html: `
          <div style="font-family: sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
            <h3 style="color: #2563eb;">Hello ${name},</h3>
            <p>Thank you for reaching out through my portfolio website! I have received your message regarding "<strong>${subject || 'Inquiry'}</strong>".</p>
            <p>I will review your message and get back to you as soon as possible.</p>
            <br />
            <p>Best regards,<br/><strong>Shubham Ramje</strong><br/>MERN Full Stack Developer<br/>Indore, MP, India</p>
          </div>
        `,
      });
    } catch (replyErr) {
      console.warn(`[Email] Auto-reply confirmation not delivered: ${replyErr.message}`);
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email] Failed to send email via SMTP: ${error.message}`);
    // We do NOT throw here so the user request still succeeds in DB
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
};
