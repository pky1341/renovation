import { NextResponse } from 'next/server'
import { verifyPassword, createToken } from '../../../../src/lib/auth.js'
import { prisma } from '../../../../src/database/connection.js'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || user.role !== 'admin' || !await verifyPassword(password, user.password)) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = await createToken({ 
      userId: user.id, 
      email: user.email,
      role: user.role
    })

    const response = NextResponse.json({
      success: true,
      message: 'Login successful'
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}