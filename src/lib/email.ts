import nodemailer from 'nodemailer'

// Email configuration - use environment variables in production
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  from: process.env.EMAIL_FROM || 'Q+ Library <noreply@qpluslibrary.com>',
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: emailConfig.auth,
})

// Email templates
export const emailTemplates = {
  welcome: (name: string, email: string) => ({
    subject: 'Welcome to Q+ Library!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #0a0a0a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #6b7280; font-size: 14px; }
            .feature-list { margin: 20px 0; }
            .feature-list li { margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Q+ Library!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Thank you for joining the Q+ Library community! We're excited to have you as part of our mission to empower queer leaders.</p>

              <h3>What's Next?</h3>
              <ul class="feature-list">
                <li>📚 Browse our extensive library of resources</li>
                <li>🎯 Access exclusive content for community organizers</li>
                <li>💡 Download templates and tools</li>
                <li>🤝 Join the collective conversation</li>
              </ul>

              <a href="${process.env.NEXT_PUBLIC_APP_URL}/library" class="button">Explore the Library</a>

              <p style="margin-top: 30px;">If you have any questions, feel free to reach out to our support team.</p>

              <div class="footer">
                <p>© 2024 Q+ Library. All rights reserved.</p>
                <p>You're receiving this email because you signed up at ${email}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${name}, Welcome to Q+ Library! Thank you for joining our community. Visit ${process.env.NEXT_PUBLIC_APP_URL}/library to start exploring.`,
  }),

  subscriptionConfirmed: (name: string, plan: string) => ({
    subject: 'Your Q+ Library Subscription is Active!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #0a0a0a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 8px 8px; }
            .success-badge { background: #54d186; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Subscription Confirmed!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>

              <div style="text-align: center;">
                <div class="success-badge">✓ ${plan} Subscription Active</div>
              </div>

              <p>Your subscription is now active and you have full access to the entire Q+ Library!</p>

              <h3>What You Can Access:</h3>
              <ul>
                <li>✓ All premium content and resources</li>
                <li>✓ Downloadable templates and guides</li>
                <li>✓ Exclusive video trainings</li>
                <li>✓ New content added weekly</li>
                <li>✓ Priority support</li>
              </ul>

              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/library" class="button">Access Your Library</a>

              <p style="margin-top: 30px; padding: 15px; background: #f7f5f0; border-radius: 6px;">
                <strong>Tip:</strong> Start by exploring our Risk & Safety Resources for essential community organizing tools.
              </p>

              <div class="footer">
                <p>Manage your subscription anytime in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">account dashboard</a></p>
                <p>© 2024 Q+ Library. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${name}, Your ${plan} subscription is now active! You have full access to the Q+ Library. Visit ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/library to start exploring.`,
  }),

  purchaseConfirmation: (name: string, contentTitle: string, price: number) => ({
    subject: `Purchase Confirmed: ${contentTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #0a0a0a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 8px 8px; }
            .purchase-box { background: #f7f5f0; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Purchase Confirmed!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>

              <p>Thank you for your purchase! Your content is now available in your library.</p>

              <div class="purchase-box">
                <h3 style="margin-top: 0;">${contentTitle}</h3>
                <p style="margin: 10px 0;"><strong>Price:</strong> $${price}</p>
                <p style="margin: 10px 0;"><strong>Access:</strong> Lifetime</p>
              </div>

              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/library" class="button">Access Your Content</a>

              <p style="margin-top: 30px;">This content is now permanently available in your library. You can download and access it anytime.</p>

              <div class="footer">
                <p>Thank you for supporting Q+ Library</p>
                <p>© 2024 Q+ Library. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${name}, Your purchase of "${contentTitle}" for $${price} is confirmed. Access it in your library at ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/library`,
  }),

  newContentAlert: (name: string, contentTitle: string, category: string) => ({
    subject: `New Content Added: ${contentTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #0a0a0a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 8px 8px; }
            .new-badge { background: #54d186; color: white; padding: 4px 12px; border-radius: 12px; display: inline-block; font-size: 12px; margin-bottom: 10px; }
            .content-card { border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Content Available!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>

              <p>Great news! New content has just been added to your Q+ Library.</p>

              <div class="content-card">
                <span class="new-badge">NEW</span>
                <h3 style="margin: 10px 0;">${contentTitle}</h3>
                <p style="color: #6b7280; margin: 10px 0;">Category: ${category}</p>
                <p>This resource is now available in your library. As a subscriber, you have immediate access!</p>
              </div>

              <a href="${process.env.NEXT_PUBLIC_APP_URL}/library" class="button">View New Content</a>

              <div class="footer">
                <p>You're receiving this because you're subscribed to Q+ Library updates.</p>
                <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings">Manage email preferences</a></p>
                <p>© 2024 Q+ Library. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${name}, New content "${contentTitle}" in ${category} is now available in your Q+ Library! Visit ${process.env.NEXT_PUBLIC_APP_URL}/library to check it out.`,
  }),

  passwordReset: (name: string, resetLink: string) => ({
    subject: 'Reset Your Q+ Library Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #0a0a0a; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3e8bc2 0%, #54d186 100%); color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>

              <p>We received a request to reset your Q+ Library password. Click the button below to create a new password:</p>

              <a href="${resetLink}" class="button">Reset Password</a>

              <div class="warning">
                <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons. If you didn't request this reset, you can safely ignore this email.
              </div>

              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #3e8bc2;">${resetLink}</p>

              <div class="footer">
                <p>For security, this password reset was requested from IP address: [IP_ADDRESS]</p>
                <p>© 2024 Q+ Library. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${name}, Reset your Q+ Library password by clicking this link: ${resetLink}. This link expires in 1 hour.`,
  }),
}

// Send email function
export async function sendEmail(
  to: string,
  template: keyof typeof emailTemplates,
  data: any
) {
  try {
    const emailContent = (emailTemplates as any)[template](...Object.values(data))

    const mailOptions = {
      from: emailConfig.from,
      to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

// Batch email function for notifications
export async function sendBatchEmails(
  recipients: string[],
  template: keyof typeof emailTemplates,
  data: any
) {
  const results = await Promise.allSettled(
    recipients.map(email => sendEmail(email, template, data))
  )

  const successful = results.filter(r => r.status === 'fulfilled').length
  const failed = results.filter(r => r.status === 'rejected').length

  return { successful, failed, total: recipients.length }
}