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

  async findWithUser(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    })
  }

  async findRecent(limit = 10) {
    return await this.findAll({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
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