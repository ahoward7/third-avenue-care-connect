import type { H3Event } from 'h3'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // try {
  //   const profile = await readBody(event) as FamilyProfile | SitterProfile

  //   const connection = await mysql.createConnection({
  //     host: process.env.DB_HOST,
  //     user: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_NAME,
  //   })

  //   const [rows] = await connection.execute(
  //     `UPDATE profiles SET ? WHERE id = ?`,
  //     [profile, profile.id],
  //   )

  //   await connection.end()
  //   return rows
  // }
  // catch (e) {
  //   console.error(e)
  //   return { error: 'Database error' }
  // }
})
