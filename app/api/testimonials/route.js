import { NextResponse } from 'next/server'
import mysql from '../../../src/lib/mysql'

export async function GET() {
  try {
    const [rows] = await mysql.execute(
      'SELECT * FROM testimonials WHERE approved = TRUE ORDER BY featured DESC, created_at DESC'
    )
    
    return NextResponse.json({ success: true, data: rows })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}