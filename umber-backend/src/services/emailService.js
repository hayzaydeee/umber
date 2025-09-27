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

  async sendMagicLink(email, token, userName, isNewUser = false) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const magicLink = `${backendUrl}/api/magic-auth/verify/${token}`;
    
    const htmlTemplate = this.getMagicLinkTemplate(userName, magicLink, isNewUser);
    
    try {
      const info = await this.transporter.sendMail({
        from: `"umber" <hello@weareumber.com>`,
        to: email,
        subject: `${userName}, your magic link to umber awaits ✨`,
        html: htmlTemplate,
        text: `Hello ${userName}, your secure sign-in link is ready. Click this link to access your thoughtfully curated collections: ${magicLink} (expires in 15 minutes for your security)`
      });

      console.log('✅ magic link sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('❌ Failed to send magic link:', error);
      throw error;
    }
  }

  getMagicLinkTemplate(userName, magicLink, isNewUser = false) {
    // Dynamic content based on user status
    const headerSubtitle = isNewUser ? "join the community!" : "welcome back!";
    const greeting = isNewUser ? `hello ${userName},` : `welcome back, ${userName}!`;
    const description = isNewUser 
      ? "your account is ready! click below to start your journey with umber!"
      : "your secure sign-in link is ready. click the link below:";
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your magic link to Umber</title>
        <style>          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #FBF8F3 0%, rgba(255, 255, 255, 1) 50%, #F2F4F2 100%);
            color: #353A34;
            min-height: 100vh;
          }
          
          .email-container {
            max-width: 560px;
            margin: 40px auto;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(83, 81, 71, 0.25), 0 0 0 1px rgba(168, 184, 164, 0.1);
            border: 1px solid #EDEAE5;
          }
          
          .header {
            text-align: center;
            padding: 48px 40px 32px 40px;
            background: white;
          }
          
          .logo {
            font-size: 48px;
            font-weight: 600;
            color: #353A34;
            margin-bottom: 16px;
            letter-spacing: -1px;
            font-family: Georgia, 'Times New Roman', serif;
          }
          
          .header-subtitle {
            font-size: 24px;
            font-weight: 500;
            color: #535147;
            margin: 0;
            letter-spacing: -0.5px;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          }
          
          .content {
            padding: 0 40px 48px 40px;
            background: white;
          }
          
          .greeting {
            font-size: 18px;
            font-weight: 500;
            color: #535147;
            margin-bottom: 24px;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          }
          
          .description {
            font-size: 16px;
            color: #6B7D67;
            margin-bottom: 32px;
            line-height: 1.7;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          }
          
          .cta-container {
            text-align: center;
            margin: 40px 0;
          }
          
          .magic-button {
            display: inline-block;
            background: linear-gradient(to right, rgb(77, 124, 15), rgb(68, 64, 60));
            color: white !important;
            text-decoration: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: all 0.2s ease;
            border: none;
            text-transform: lowercase;
            letter-spacing: normal;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
            cursor: pointer;
          }
          
          .magic-button:hover {
            background: linear-gradient(to right, rgb(63, 98, 18), rgb(41, 37, 36));
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          }
          
          .security-card {
            background: #F7F6F4;
            border: 1px solid #EDEAE5;
            border-radius: 12px;
            padding: 20px;
            margin: 32px 0;
          }
          
          .security-title {
            font-weight: 600;
            color: #353A34;
            margin-bottom: 8px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          }
          
          .security-text {
            color: #6B7D67;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          }
          
          .divider {
            margin: 32px 0;
            position: relative;
            text-align: center;
          }
          
          .divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: #DDD7CC;
          }
          
          .divider-text {
            background: white;
            padding: 0 16px;
            color: #998772;
            font-size: 14px;
            font-weight: 500;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          }
          
          .footer-card {
            background: linear-gradient(135deg, #F7F6F4 0%, #EDEAE5 100%);
            border-top: 1px solid #DDD7CC;
            padding: 32px 40px;
            text-align: center;
          }
          
          .footer-text {
            color: #6B7D67;
            font-size: 14px;
            margin: 0 0 16px 0;
            line-height: 1.6;
            font-family: 'Outfit', sans-serif;
          }
          
          .footer-link {
            color: #535147;
            text-decoration: none;
            font-weight: 500;
            font-family: 'Outfit', sans-serif;
          }
          
          .footer-link:hover {
            color: #5B6F57;
          }
          
          .trust-indicators {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 24px;
            flex-wrap: wrap;
          }
          
          .trust-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #6B7D67;
            font-size: 12px;
            font-weight: 500;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
          }
          
          .check-icon {
            color: #5B6F57;
            font-weight: bold;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 600px) {
            .email-container {
              margin: 20px 10px;
              border-radius: 16px;
            }
            
            .header, .content, .footer-card {
              padding: 32px 24px;
            }
            
            .logo {
              font-size: 40px;
            }
            
            .header-subtitle {
              font-size: 20px;
            }
            
            .magic-button {
              font-size: 16px;
              padding: 14px 28px;
            }
            
            .trust-indicators {
              flex-direction: column;
              gap: 12px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo"><span style="font-style: italic;">u</span>mber</div>
            <p class="header-subtitle">${headerSubtitle}</p>
          </div>
          
          <div class="content">
            <div class="greeting">${greeting}</div>
            
            <p class="description">
              ${description}
            </p>
            
            <div class="cta-container">
              <a href="${magicLink}" class="magic-button">
                sign in to umber
              </a>
            </div>
            
            <div class="security-card">
              <p class="security-text">
                this magic link expires in 15 minutes for your protection. if you didn't request this sign-in, 
                you can safely ignore this email.
              </p>
            </div>
        
            
            <div style="text-align: center; margin: 24px 0;">
              <p style="color: #6B7D67; font-size: 14px; margin: 0; font-family: 'Outfit', sans-serif;">
                having trouble? copy and paste this link into your browser:<br>
                <span style="color: #535147; font-size: 12px; word-break: break-all; font-family: 'Outfit', sans-serif;">${magicLink}</span>
              </p>
            </div>
          </div>
          
          <div class="footer-card">
            <p class="footer-text">
              this email was sent by umber - your contemplative curation companion.<br>
              questions? reach out to us at <a href="mailto:hello@weareumber.com" class="footer-link">hello@weareumber.com</a>
            </p>
        
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
