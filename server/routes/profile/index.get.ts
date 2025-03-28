import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // try {
  //   const { id } = getQuery(event) as { id: string }

  //   const { dbHost, dbUser, dbPassword, dbName } = useRuntimeConfig()

  //   const connection = await mysql.createConnection({
  //     host: dbHost,
  //     user: dbUser,
  //     password: dbPassword,
  //     database: dbName,
  //   })

  //   const result = await connection.execute('SELECT * FROM profiles WHERE id = ?', [id])

  //   await connection.end()

  //   if (!result[0]) {
  //     return { error: 'Profile not found' }
  //   }

  //   await connection.end()
  //   return result[0]
  // }
  // catch (e) {
  //   console.error(e)
  //   return { error: 'Database error' }
  // }
})
