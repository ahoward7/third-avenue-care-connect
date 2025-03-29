import type { H3Event } from 'h3'
import pgk from 'pg'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { token } = getQuery(event)

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
      WHERE password_reset_token = $1
        AND password_reset_expires > NOW()
    `
    const values = [token]
    const result = await client.query(query, values)

    await client.end()

    return convertKeysToCamel(result.rows)[0]
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
