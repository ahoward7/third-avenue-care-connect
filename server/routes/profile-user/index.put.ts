import type { H3Event } from 'h3'
import { defineEventHandler, readBody } from 'h3'
import pgk from 'pg'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const profile = await readBody(event) as SitterProfile | FamilyProfile

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    if (profile.profileType === 'sitter') {
      const sitterProfile = profile as SitterProfile
      const updateFields = ['image', 'first_name', 'last_name', 'bio', 'email', 'phone', 'is_completed']
      const values = [
        sitterProfile.image,
        sitterProfile.firstName,
        sitterProfile.lastName,
        sitterProfile.bio,
        sitterProfile.email,
        sitterProfile.phone,
        true,
      ]

      const result = await client.query(
        `UPDATE profiles
         SET ${updateFields.map((field, i) => `${field} = $${i + 1}`).join(', ')}
         WHERE id = ${sitterProfile.id}
         RETURNING *`,
        values,
      )

      await client.end()
      return result.rows[0]
    }
    else {
      const familyProfile = profile as FamilyProfile
      const updateFields = ['image', 'display_name', 'bio', 'email', 'phone', 'address', 'children', 'is_completed']
      const values = [
        familyProfile.image,
        familyProfile.displayName,
        familyProfile.bio,
        familyProfile.email,
        familyProfile.phone,
        familyProfile.address,
        JSON.stringify(familyProfile.children || []),
        true,
      ]

      const result = await client.query(
        `UPDATE profiles
         SET ${updateFields.map((field, i) => `${field} = $${i + 1}`).join(', ')}
         WHERE id = ${familyProfile.id}
         RETURNING *`,
        values,
      )

      await client.end()
      return result.rows[0]
    }
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
