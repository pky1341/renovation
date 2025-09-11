import { ContactModel } from '../models/contact.model.js'
import { EmailService } from '../services/email.service.js'
import { CacheService } from '../services/cache.service.js'

export class ContactController {
  constructor() {
    this.contactModel = new ContactModel()
    this.emailService = new EmailService()
    this.cacheService = new CacheService()
  }

  async create(data) {
    try {
      const contact = await this.contactModel.create(data)
      await this.emailService.sendContactNotification(contact)
      await this.cacheService.del('recent_contacts')
      
      return {
        success: true,
        data: contact,
        message: 'Contact created successfully'
      }
    } catch (error) {
      throw new Error(`Failed to create contact: ${error.message}`)
    }
  }

  async getAll(filters = {}) {
    try {
      const cacheKey = `contacts_${JSON.stringify(filters)}`
      let contacts = await this.cacheService.get(cacheKey)
      
      if (!contacts) {
        contacts = await this.contactModel.findAll({
          where: filters,
          include: { user: { select: { name: true, email: true } } },
          orderBy: { createdAt: 'desc' }
        })
        await this.cacheService.set(cacheKey, contacts, 300)
      }
      
      return { success: true, data: contacts }
    } catch (error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`)
    }
  }
}