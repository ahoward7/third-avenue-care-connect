import TACC from '../../utils/taccClient'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

export default defineEventHandler(async () => {
  try {
    const client = TACC()

    await client.connect()

    const query = `
      SELECT * 
      FROM profiles
    `
    const result = await client.query(query)

    await client.end()

    return convertKeysToCamel(result.rows)
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
