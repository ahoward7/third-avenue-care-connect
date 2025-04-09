import type { H3Event } from 'h3'
import bcrypt from 'bcryptjs'
import pgk from 'pg'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const profile = await readBody(event) as FamilyProfile | SitterProfile

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    const hashedPassword = await bcrypt.hash(profile.password, 10)

    const query = `
      UPDATE profiles
      SET password = $1
      WHERE id = $2
      RETURNING *
    `
    const values = [
      hashedPassword,
      profile.id,
    ]

    const result = await client.query(query, values)

    await client.end()

    if (result.rowCount === 0) {
      throw createError({ statusCode: 404, message: 'Profile not found' })
    }
    const updatedProfile = result.rows[0]

    return updatedProfile
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
