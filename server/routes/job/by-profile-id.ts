import type { H3Event } from 'h3'
import { createError, defineEventHandler } from 'h3'
import pgk from 'pg'
import { formatJobs } from '../../utils/formatJobs'
import { convertKeysToCamel } from '../../utils/snakeToCamel'

const { Client } = pgk

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { profileId, profileType } = getQuery(event)

    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    await client.connect()

    const whereClause = profileType === 'sitter'
      ? 'jobs.sitter = $1'
      : 'jobs.family = $1'

    const query = `
      SELECT 
        jobs.*, 
        family_profiles.email AS family_email,
        family_profiles.phone AS family_phone,
        family_profiles.display_name AS family_display_name,
        family_profiles.image AS family_image,
        family_profiles.bio AS family_bio,
        family_profiles.address AS family_address,
        family_profiles.children AS family_children,
    
        sitter_profiles.first_name AS sitter_first_name,
        sitter_profiles.last_name AS sitter_last_name
    
      FROM 
        jobs
    
      JOIN 
        profiles AS family_profiles ON jobs.family = family_profiles.id
    
      LEFT JOIN 
        profiles AS sitter_profiles ON jobs.sitter = sitter_profiles.id
    
      WHERE
        ${whereClause}
    
      LIMIT 10
      OFFSET 0;
    `

    const values = [profileId]
    const result = await client.query(query, values)

    await client.end()

    if (!result) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid profile id' })
    }

    const camelCaseResult = convertKeysToCamel(result.rows)

    return formatJobs(camelCaseResult)
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
