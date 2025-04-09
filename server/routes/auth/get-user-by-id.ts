import type { H3Event } from 'h3'
import { convertKeysToCamel } from '../../utils/snakeToCamel'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { userId } = getQuery(event)

    const client = TACC()

    await client.connect()

    let user = await client.query('SELECT * FROM profiles WHERE id = $1', [userId])

    if (!user.rows[0]) {
      const adminResult = await client.query('SELECT * FROM admin WHERE id = $1', [userId])

      if (!adminResult.rows[0]) {
        await client.end()
        throw createError({ statusCode: 404, statusMessage: 'User not found' })
      }

      user = adminResult
    }

    await client.end()

    return convertKeysToCamel(user.rows[0])
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
