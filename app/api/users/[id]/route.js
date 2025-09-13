import { NextResponse } from 'next/server'
import { hashPassword } from '../../../../src/lib/auth.js'
import { prisma } from '../../../../src/database/connection.js'

export async function PUT(request, { params }) {
  try {
    const { email, password, name, role } = await request.json()
    
    const updateData = {
      email,
      name: name || null,
      role: role || 'user'
    }

    if (password) {
      updateData.password = await hashPassword(password)
    }

    const user = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: user,
      message: 'User updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.user.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'User deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}