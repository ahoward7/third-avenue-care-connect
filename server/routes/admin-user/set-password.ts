import type { H3Event } from 'h3'
import bcrypt from 'bcryptjs'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const admin = await readBody(event) as Admin

    const client = TACC()

    await client.connect()

    const hashedPassword = await bcrypt.hash(admin.password, 10)

    const query = `
      UPDATE admin
      SET password = $1
      WHERE id = $2
      RETURNING *
    `
    const values = [
      hashedPassword,
      admin.id,
    ]

    const result = await client.query(query, values)

    await client.end()

    const updatedAdmin = result.rows[0]

    if (!updatedAdmin) {
      throw createError({ statusCode: 404, message: 'Admin not found' })
    }

    return updatedAdmin
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
