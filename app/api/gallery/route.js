import { NextResponse } from 'next/server'

const projects = [
  {
    id: 1,
    title: "Modern Tech Office",
    category: "Corporate",
    location: "Mumbai",
    size: "5000 sq ft",
    timeline: "6 weeks",
    before_image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    after_image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    description: "Complete transformation of corporate headquarters",
    featured: true
  }
]

export async function GET() {
  return NextResponse.json({ success: true, data: projects })
}