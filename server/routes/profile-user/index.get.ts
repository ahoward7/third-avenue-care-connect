import type { H3Event } from 'h3'
import bcrypt from 'bcryptjs'
import { convertKeysToCamel } from '../../utils/snakeToCamel'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const query = getQuery(event)
    const { id, token, all } = query as { id?: string, token?: string, all?: boolean }

    const client = TACC()
    await client.connect()

    try {
      let sqlQuery = ''
      let params: any[] = []
      let result

      if (id) {
        sqlQuery = `
          SELECT * 
          FROM profiles 
          WHERE id = $1
        `
        params = [id]
        result = await client.query(sqlQuery, params)

        if (result.rows.length === 0) {
          throw createError({ statusCode: 404, message: 'Invalid ID' })
        }

        return convertKeysToCamel(result.rows[0])
      }

      if (token) {
        sqlQuery = `
          SELECT * 
          FROM profiles 
          WHERE password_reset_expires > NOW()
        `
        result = await client.query(sqlQuery)

        const profile = result.rows.find(row => bcrypt.compareSync(token, row.password_reset_token))

        if (!profile) {
          throw createError({ statusCode: 404, message: 'Invalid or expired token' })
        }

        return convertKeysToCamel(profile)
      }

      if (all) {
        sqlQuery = `
          SELECT * 
          FROM profiles
        `
        result = await client.query(sqlQuery)
        return convertKeysToCamel(result.rows)
      }

      throw createError({
        statusCode: 400,
        message: 'Missing required parameter: id, token, or all=true',
      })
    }
    finally {
      await client.end()
    }
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
