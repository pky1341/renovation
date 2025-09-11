import { NextResponse } from 'next/server'
import { services } from '../../../src/lib/data'

export async function GET() {
  return NextResponse.json({ success: true, data: services })
}