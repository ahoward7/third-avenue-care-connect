import type { H3Event } from 'h3'
import bcryptjs from 'bcryptjs'
import { createError, defineEventHandler, readBody } from 'h3'
import pgk from 'pg'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { email, password } = await readBody(event) as LoginForm

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    const result = await client.query('SELECT * FROM profiles WHERE email = $1', [email])

    if (!result.rows[0]) {
      await client.end()
      throw createError({ statusCode: 401, statusMessage: 'Invalid email' })
    }

    const user = result.rows[0]

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password)

    if (!isPasswordCorrect) {
      await client.end()
      throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
    }

    await client.end()

    await setUserSession(event, { user: { userId: user.id, email: user.email } })

    return convertKeysToCamel([user])[0]
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
