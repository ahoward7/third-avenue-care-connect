import type { H3Event } from 'h3'
import pgk from 'pg'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { id } = getQuery(event) as { id: string }

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    const query = `
      SELECT * 
      FROM profiles 
      WHERE id = $1
    `
    const result = await client.query(query, [id])

    await client.end()

    const profile = result.rows[0]

    if (!profile) {
      throw createError({ statusCode: 404, message: 'Invalid ID' })
    }

    return convertKeysToCamel(profile)
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
