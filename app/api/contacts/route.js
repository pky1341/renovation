import { NextResponse } from 'next/server'
import { ContactController } from '../../../src/controllers/contact.controller.js'

const contactController = new ContactController()

export async function POST(request) {
  try {
    const body = await request.json()
    const result = await contactController.create(body)
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const filters = status ? { status } : {}
    const result = await contactController.getAll(filters)
    
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}