import type { H3Event } from 'h3'
import bcryptjs from 'bcryptjs'
import { defineEventHandler, readBody } from 'h3'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { email, password } = await readBody(event) as LoginForm

    const client = TACC()

    await client.connect()

    const result = await client.query('SELECT * FROM admin WHERE email = $1', [email])

    if (!result.rows[0]) {
      await client.end()
      throw createError('Invalid email')
    }

    const user = result.rows[0]

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password)

    if (!isPasswordCorrect) {
      await client.end()
      return { error: 'Invalid password' }
    }

    await setUserSession(event, { user: { userId: user.id, email: user.email } })

    await client.end()
    return {
      id: user.id,
      email: user.email,
    }
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
