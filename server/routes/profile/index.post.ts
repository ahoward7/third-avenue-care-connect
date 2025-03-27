import type { H3Event } from 'h3'
import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const signupForm = await readBody(event) as SitterSignupForm | FamilySignupForm

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    if (signupForm.type === 'family') {
      const familySignupFrom = signupForm as FamilySignupForm
      const familyProfile: FamilyProfile = {
        image: '',
        name: familySignupFrom.displayName,
        bio: '',
        email: familySignupFrom.email,
        password: '',
        phone: familySignupFrom.phone,
        address: '',
        notes: '',
        children: [],
        profileType: 'family',
        isApproved: false,
      }

      const [rows] = await connection.execute(
        `INSERT INTO profiles (image, name, bio, email, password, phone, address, notes, profileType, isApproved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          familyProfile.image,
          familyProfile.name,
          familyProfile.bio,
          familyProfile.email,
          familyProfile.password || 'UNSET',
          familyProfile.phone,
          familyProfile.address,
          familyProfile.notes,
          familyProfile.profileType,
          familyProfile.isApproved ? 1 : 0,
        ],
      )

      await connection.end()
      return rows
    }

    const sitterSignupForm = signupForm as SitterSignupForm
    const sitterProfile: SitterProfile = {
      image: '',
      firstName: sitterSignupForm.firstName,
      lastName: sitterSignupForm.lastName,
      bio: '',
      email: sitterSignupForm.email,
      password: '',
      phone: sitterSignupForm.phone,
      profileType: 'sitter',
      isApproved: false,
    }

    const [result] = await connection.execute(
      `INSERT INTO profiles (image, firstName, lastName, bio, email, password, phone, profileType, isApproved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sitterProfile.image,
        sitterProfile.firstName,
        sitterProfile.lastName,
        sitterProfile.bio,
        sitterProfile.email,
        sitterProfile.password,
        sitterProfile.phone,
        sitterProfile.profileType,
        sitterProfile.isApproved ? 1 : 0,
      ],
    )

    await connection.end()
    return result
  }
  catch (e) {
    console.error(e)
    return { error: 'Database error' }
  }
})
