import type { H3Event } from 'h3'
import { createError, defineEventHandler, readBody } from 'h3'
import pgk from 'pg'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const job = await readBody(event) as JobPut

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    await client.connect()

    const query = `
      UPDATE jobs
      SET sitter = $1
      WHERE id = $2
      RETURNING *
    `
    const values = [job.sitter, job.id]
    const result = await client.query(query, values)

    await client.end()

    if (!result) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid job' })
    }

    return convertKeysToCamel([result.rows[0]])[0]
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
