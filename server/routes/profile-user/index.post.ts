import type { H3Event } from 'h3'
import { defineEventHandler, readBody } from 'h3'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const signupForm = await readBody(event) as SitterSignupForm | FamilySignupForm

    const client = TACC()

    await client.connect()

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

      const result = await client.query(
        `INSERT INTO profiles (${insertFields.join(', ')})
        VALUES (${insertFields.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`,
        values,
      )

      await client.end()
      return result.rows[0]
    }

    if (signupForm.type === 'sitter') {
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

    throw new Error('Invalid profile type')
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
