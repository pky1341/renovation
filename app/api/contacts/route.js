import { NextResponse } from 'next/server'
import { prisma } from '../../../src/database/connection.js'

export async function POST(request) {
  try {
    const body = await request.json()
    
    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        spaceType: body.serviceType || 'office',
        message: body.message || '',
        status: 'new'
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      data: inquiry,
      message: 'Inquiry created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Prisma error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range')
    const sort = searchParams.get('sort')
    const filter = searchParams.get('filter')

    let query = {
      orderBy: { createdAt: 'desc' }
    }

    if (range) {
      const [start, end] = JSON.parse(range)
      query.skip = start
      query.take = end - start + 1
    }

    if (sort) {
      const [field, order] = JSON.parse(sort)
      query.orderBy = { [field]: order.toLowerCase() }
    }

    // Handle filtering
    if (filter) {
      const filterObj = JSON.parse(filter)
      query.where = {}
      
      if (filterObj.q) {
        query.where.OR = [
          { name: { contains: filterObj.q, mode: 'insensitive' } },
          { email: { contains: filterObj.q, mode: 'insensitive' } }
        ]
      }
      
      if (filterObj.status) query.where.status = filterObj.status
      if (filterObj.spaceType) query.where.spaceType = filterObj.spaceType
    }

    const inquiries = await prisma.inquiry.findMany(query)
    const total = await prisma.inquiry.count({ where: query.where })
    
    const response = NextResponse.json({ success: true, data: inquiries })
    response.headers.set('Content-Range', `inquiries 0-${inquiries.length}/${total}`)
    
    return response
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}