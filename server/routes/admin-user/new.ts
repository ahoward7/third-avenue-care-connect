import type { H3Event } from 'h3'
import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { defineEventHandler, readBody } from 'h3'
import pkg from 'pg'

const { Client } = pkg

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { email } = await readBody(event) as { email: string }

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    const rawToken = crypto.randomUUID()

    const hashedToken = await bcrypt.hash(rawToken, 10)
    const passwordResetExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const query = `
      INSERT INTO admin (email, password_reset_token, password_reset_expires)
      VALUES ($1, $2, $3)
      RETURNING id, email, password_reset_token, password_reset_expires
    `
    const values = [email, hashedToken, passwordResetExpires]

    const result = await client.query(query, values)

    await client.end()

    if (result.rowCount === 0) {
      throw createError({ statusCode: 500, message: 'Failed to create admin' })
    }

    const newAdmin = result.rows[0]

    return {
      id: newAdmin.id,
      email: newAdmin.email,
      password_reset_token: newAdmin.password_reset_token,
      password_reset_expires: newAdmin.password_reset_expires,
    }
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
