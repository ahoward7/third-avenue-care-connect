import type { H3Event } from 'h3'
import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import pgk from 'pg'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const profile = await readBody(event)

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    await client.connect()

    const passwordResetToken = crypto.randomUUID()

    const hashedToken = await bcrypt.hash(passwordResetToken, 10)
    const passwordResetExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const query = `
      UPDATE profiles
      SET is_approved = $1,
          password_reset_token = $2,
          password_reset_expires = $3
      WHERE id = $4
      RETURNING *
    `
    const values = [profile.isApproved, hashedToken, passwordResetExpires, profile.id]
    const result = await client.query(query, values)

    await client.end()

    if (result.rowCount === 0) {
      throw createError({ statusCode: 404, message: 'Profile not found' })
    }
    const updatedProfile = result.rows[0]

    return updatedProfile
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
