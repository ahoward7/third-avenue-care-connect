import type { H3Event } from 'h3'
import bcrypt from 'bcryptjs'
import pgk from 'pg'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { token } = getQuery(event) as { token: string }

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    await client.connect()

    const query = `
      SELECT * 
      FROM profiles 
      WHERE password_reset_expires > NOW()
    `
    const result = await client.query(query)

    await client.end()

    const profile = result.rows.find(row => bcrypt.compareSync(token, row.password_reset_token))

    if (!profile) {
      throw createError({ statusCode: 404, message: 'Invalid or expired token' })
    }

    return convertKeysToCamel(profile)
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
