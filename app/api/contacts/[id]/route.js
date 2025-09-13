import { NextResponse } from 'next/server'
import { prisma } from '../../../../src/database/connection.js'

export async function GET(request, { params }) {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: parseInt(params.id) }
    })
    
    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: inquiry })
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
    
    const inquiry = await prisma.inquiry.update({
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
      data: inquiry,
      message: 'Inquiry updated successfully'
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
    await prisma.inquiry.delete({
      where: { id: parseInt(params.id) }
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}