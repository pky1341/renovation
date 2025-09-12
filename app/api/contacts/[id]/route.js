import { NextResponse } from 'next/server'
import prisma from '../../../../src/database/connection.js'

export async function GET(request, { params }) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(params.id) }
    })
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: contact })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    
    const contact = await prisma.contact.update({
      where: { id: parseInt(params.id) },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        spaceType: body.spaceType,
        message: body.message || '',
        status: body.status
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      data: contact,
      message: 'Contact updated successfully'
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
    await prisma.contact.delete({
      where: { id: parseInt(params.id) }
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}