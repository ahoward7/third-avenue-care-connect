import { createError, defineEventHandler } from 'h3'
import pgk from 'pg'
import { formatJobs } from '../../utils/formatJobs'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    })

    await client.connect()

    const query = `
      SELECT 
          jobs.*, 
          profiles.email AS family_email,
          profiles.phone AS family_phone,
          profiles.display_name AS family_display_name,
          profiles.image AS family_image,
          profiles.bio AS family_bio,
          profiles.address AS family_address,
          profiles.children AS family_children
      FROM 
          jobs
      JOIN 
          profiles
      ON 
          jobs.family = profiles.id
      WHERE
          jobs.sitter IS NULL;
    `
    const result = await client.query(query)

    await client.end()

    const camelCaseResult = convertKeysToCamel(result.rows)

    return formatJobs(camelCaseResult)
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
