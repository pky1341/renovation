import { NextResponse } from 'next/server'
import { testimonials } from '../../../src/lib/data'

export async function GET() {
  return NextResponse.json({ success: true, data: testimonials })
}