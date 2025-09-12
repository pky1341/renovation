import { BaseModel } from './base.model.js'

export class ContactModel extends BaseModel {
  constructor() {
    super('contact')
  }

  async findByStatus(status) {
    return await this.findAll({
      where: { status },
      orderBy: { createdAt: 'desc' }
    })
  }

  async findRecent(limit = 10) {
    return await this.findAll({
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  }

  async updateStatus(id, status) {
    return await this.update(id, { 
      status,
      updatedAt: new Date()
    })
  }

  async searchByEmail(email) {
    return await this.findAll({
      where: {
        email: {
          contains: email
        }
      }
    })
  }
}