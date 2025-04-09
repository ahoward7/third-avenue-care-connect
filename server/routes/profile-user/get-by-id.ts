import type { H3Event } from 'h3'
import TACC from '../../utils/taccClient'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { id } = getQuery(event) as { id: string }

    const client = TACC()

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
