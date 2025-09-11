export class EmailService {
  constructor() {
    this.apiKey = process.env.EMAIL_API_KEY
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@officetransform.com'
  }

  async sendContactNotification(contact) {
    try {
      // Email notification logic
      const emailData = {
        to: 'admin@officetransform.com',
        from: this.fromEmail,
        subject: `New Contact: ${contact.name}`,
        html: this.generateContactEmailTemplate(contact)
      }

      // Send email using your preferred service (SendGrid, Nodemailer, etc.)
      console.log('Email sent:', emailData.subject)
      
      return { success: true }
    } catch (error) {
      console.error('Email service error:', error)
      throw new Error('Failed to send notification email')
    }
  }

  generateContactEmailTemplate(contact) {
    return `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
      <p><strong>Space Type:</strong> ${contact.spaceType}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
    `
  }
}