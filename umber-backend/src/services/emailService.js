const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // For development, we'll use Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates in development
      }
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.log('❌ Email service configuration error:', error.message);
        console.log('💡 Make sure to set EMAIL_USER and EMAIL_PASS in your .env file');
      } else {
        console.log('✅ Email service ready');
      }
    });
  }

  async sendMagicLink(email, token, userName) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const magicLink = `${backendUrl}/api/magic-auth/verify/${token}`;
    
    const htmlTemplate = this.getMagicLinkTemplate(userName, magicLink);
    
    try {
      const info = await this.transporter.sendMail({
        from: `"Umber" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'sign in to umber',
        html: htmlTemplate,
        text: `hi ${userName}, click this link to sign in to umber: ${magicLink} (expires in 15 minutes)`
      });

      console.log('✅ Magic link sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('❌ Failed to send magic link:', error);
      throw error;
    }
  }

  getMagicLinkTemplate(userName, magicLink) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign in to Umber</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8f7f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #8B5A2B 0%, #A0632E 100%);
            color: white;
            padding: 40px 32px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content {
            padding: 40px 32px;
          }
          .greeting {
            font-size: 18px;
            color: #2d2d2d;
            margin-bottom: 24px;
          }
          .magic-button {
            display: inline-block;
            background: linear-gradient(135deg, #8B5A2B 0%, #A0632E 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 24px 0;
            transition: transform 0.2s;
          }
          .magic-button:hover {
            transform: translateY(-1px);
          }
          .security-note {
            background: #f8f7f4;
            border-left: 4px solid #8B5A2B;
            padding: 16px;
            margin: 24px 0;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            padding: 24px 32px;
            border-top: 1px solid #e5e5e5;
            color: #666;
            font-size: 14px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌿 Umber</div>
            <h1>Welcome back!</h1>
          </div>
          
          <div class="content">
            <div class="greeting">Hi ${userName},</div>
            
            <p>Click the button below to sign in to your Umber account:</p>
            
            <div style="text-align: center;">
              <a href="${magicLink}" class="magic-button">
                Sign in to Umber
              </a>
            </div>
            
            <div class="security-note">
              <strong>🔐 Security Note:</strong> This link expires in 15 minutes for your security. 
              If you didn't request this, you can safely ignore this email.
            </div>
            
            <p>Ready to organize your collections with Umber? We're excited to have you back!</p>
          </div>
          
          <div class="footer">
            <p>This email was sent by Umber. If you have any questions, feel free to reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
