const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const user = await prisma.user.upsert({
      where: { email: 'admin@officetransform.com' },
      update: {},
      create: {
        email: 'admin@officetransform.com',
        password: hashedPassword,
        role: 'admin',
        name: 'Admin User'
      }
    })
    
    console.log('Admin user created:', user.email)
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()