import type { H3Event } from 'h3'
import crypto from 'node:crypto'

import bcrypt from 'bcryptjs'
import pgk from 'pg'

const { Client } = pgk

function createEmail(token: string) {
  return `
    <div>
      <h1>Profile Approved!</h1>
      <p>Congratulations! Your profile has been approved. Please follow this link to set your password: 
        <a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a>
      </p>
      <p>If there are any issues, please contact us directly.</p>
      <br>
      <h3>Third Avenue Care Connect</h3>
    </div>
  `
}

export default defineEventHandler(async (event: H3Event) => {
  const { sendMail } = useNodeMailer()

  try {
    const profile = await readBody(event)

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    const passwordResetToken = crypto.randomUUID()

    await sendMail({
      subject: 'You Have Been Approved!',
      html: createEmail(passwordResetToken),
      to: 'avery.d.howard@gmail.com',
    })

    const hashedToken = await bcrypt.hash(passwordResetToken, 10)
    const passwordResetExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const query = `
      UPDATE profiles
      SET is_approved = $1,
          password_reset_token = $2,
          password_reset_expires = $3
      WHERE id = $4
      RETURNING *
    `
    const values = [profile.isApproved, hashedToken, passwordResetExpires, profile.id]
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
