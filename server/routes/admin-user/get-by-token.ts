import type { H3Event } from 'h3'
import bcrypt from 'bcryptjs'
import { convertKeysToCamel } from '../../utils/snakeToCamel'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { token } = getQuery(event) as { token: string }

    const client = TACC()

    await client.connect()

    const query = `
      SELECT * 
      FROM admin 
      WHERE password_reset_expires > NOW()
    `
    const result = await client.query(query)

    await client.end()

    const admin = result.rows.find(row => bcrypt.compareSync(token, row.password_reset_token))

    if (!admin) {
      throw createError({ statusCode: 404, message: 'Invalid or expired token' })
    }

    return convertKeysToCamel(admin)
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
