import type { H3Event } from 'h3'
import { createError, defineEventHandler, readBody } from 'h3'
import pgk from 'pg'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const job = await readBody(event) as JobPost

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    const query = `
      INSERT INTO jobs (family, start_time, end_time, date, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const values = [job.family, job.startTime, job.endTime, job.date, job.description]
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
