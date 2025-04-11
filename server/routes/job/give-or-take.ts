import type { H3Event } from 'h3'
import { createError, defineEventHandler, readBody } from 'h3'
import { convertKeysToCamel } from '../../utils/snakeToCamel'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const job = await readBody(event) as JobPut

    const client = TACC()

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
    throw createError({ statusCode: 500, statusMessage: `Error taking or giving up job: ${e}` })
  }
})
