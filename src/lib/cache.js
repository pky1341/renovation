// Redis cache implementation
import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
})

export const cache = {
  async get(key) {
    try {
      const data = await redis.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  },

  async set(key, data, ttl = 3600) {
    try {
      await redis.setEx(key, ttl, JSON.stringify(data))
    } catch (error) {
      console.error('Cache set error:', error)
    }
  },

  async del(key) {
    try {
      await redis.del(key)
    } catch (error) {
      console.error('Cache delete error:', error)
    }
  }
}