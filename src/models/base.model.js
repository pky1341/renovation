import prisma from '../database/connection.js'

export class BaseModel {
  constructor(modelName) {
    this.model = prisma[modelName]
    this.modelName = modelName
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) }
    })
  }

  async findAll(options = {}) {
    const { where, include, orderBy, take = 100, skip = 0 } = options
    
    return await this.model.findMany({
      where,
      include,
      orderBy,
      take,
      skip
    })
  }

  async create(data) {
    return await this.model.create({
      data
    })
  }

  async update(id, data) {
    return await this.model.update({
      where: { id: parseInt(id) },
      data
    })
  }

  async delete(id) {
    return await this.model.delete({
      where: { id: parseInt(id) }
    })
  }
}