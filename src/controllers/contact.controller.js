import { ContactModel } from '../models/contact.model.js'
import { EmailService } from '../services/email.service.js'
import { PrismaClient, ContactStatus } from '@prisma/client';

export class ContactController {
  constructor() {
    this.contactModel = new ContactModel()
    this.emailService = new EmailService()
  }

  async create(data) {
    try {
      data.status = data.status || ContactStatus.new;

      const contact = await this.contactModel.create(data);
      await this.emailService.sendContactNotification(contact);
      
      return {
        success: true,
        data: contact,
        message: 'Contact created successfully'
      };
    } catch (error) {
      throw new Error(`Failed to create contact: ${error.message}`);
    }
  }

  async getAll(filters = {}) {
    try {
      const contacts = await this.contactModel.findAll({
        where: filters,
        orderBy: { createdAt: 'desc' }
      })
      
      return { success: true, data: contacts }
    } catch (error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`)
    }
  }
}