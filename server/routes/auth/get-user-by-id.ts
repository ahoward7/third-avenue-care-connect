import type { H3Event } from 'h3'
import pgk from 'pg'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { userId } = getQuery(event)

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    await client.connect()

    let user = await client.query('SELECT * FROM profiles WHERE id = $1', [userId])

    if (!user.rows[0]) {
      const adminResult = await client.query('SELECT * FROM admins WHERE id = $1', [userId])

      if (!adminResult.rows[0]) {
        await client.end()
        throw createError({ statusCode: 404, statusMessage: 'User not found' })
      }

      user = adminResult
    }

    await client.end()

    return convertKeysToCamel(user)
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
