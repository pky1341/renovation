import { NextResponse } from 'next/server'
import mysql from '../../../src/lib/mysql'

export async function POST(request) {
  try {
    const { name, email, phone, spaceType, message } = await request.json()

    const [result] = await mysql.execute(
      'INSERT INTO contacts (name, email, phone, space_type, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, email, phone, spaceType, message]
    )

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: result.insertId 
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const [rows] = await mysql.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10'
    )
    
    return NextResponse.json({ success: true, data: rows })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}