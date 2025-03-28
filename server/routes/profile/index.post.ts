import type { H3Event } from 'h3'
import { defineEventHandler, readBody } from 'h3'
import pgk from 'pg'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const signupForm = await readBody(event) as SitterSignupForm | FamilySignupForm

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    await client.connect()

    console.log(signupForm)

    if (signupForm.type === 'family') {
      const familySignupFrom = signupForm as FamilySignupForm
      const familyProfile: Partial<FamilyProfile> = {
        email: familySignupFrom.email,
        phone: familySignupFrom.phone,
        profileType: 'family',
        displayName: familySignupFrom.displayName,
      }

      const insertFields = ['profile_type', 'email', 'phone', 'display_name']
      const values = [
        familyProfile.profileType,
        familyProfile.email,
        familyProfile.phone,
        familyProfile.displayName,
      ]

      console.log(values)

      const result = await client.query(
        `INSERT INTO profiles (${insertFields.join(', ')})
        VALUES (${insertFields.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`,
        values,
      )

      await client.end()
      return result.rows[0]
    }

    const sitterSignupForm = signupForm as SitterSignupForm
    const sitterProfile: Partial<SitterProfile> = {
      email: sitterSignupForm.email,
      phone: sitterSignupForm.phone,
      profileType: 'sitter',
      firstName: sitterSignupForm.firstName,
      lastName: sitterSignupForm.lastName,
    }

    const insertFields = ['profile_type', 'email', 'phone', 'first_name', 'last_name']
    const values = [
      sitterProfile.profileType,
      sitterProfile.email,
      sitterProfile.phone,
      sitterProfile.firstName,
      sitterProfile.lastName,
    ]

    const result = await client.query(
      `INSERT INTO profiles (${insertFields.join(', ')})
      VALUES (${insertFields.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`,
      values,
    )

    await client.end()
    return result.rows[0]
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
