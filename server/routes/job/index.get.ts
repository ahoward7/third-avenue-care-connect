import type { H3Event } from 'h3'
import { createError, defineEventHandler } from 'h3'
import { formatJobs } from '../../utils/formatJobs'
import { convertKeysToCamel } from '../../utils/snakeToCamel'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { profileId, profileType, availableOnly } = getQuery(event) as {
      profileId?: string
      profileType?: 'sitter' | 'family'
      availableOnly?: string
    }

    const client = TACC()
    await client.connect()

    try {
      let whereClause = ''
      let values: any[] = []

      if (profileId && profileType) {
        whereClause = profileType === 'sitter'
          ? 'jobs.sitter = $1'
          : 'jobs.family = $1'
        values = [profileId]
      }
      else if (availableOnly === 'true') {
        whereClause = 'jobs.sitter IS NULL'
      }
      else {
        whereClause = '1=1'
      }

      const query = `
        SELECT 
          jobs.*, 
          family_profiles.id AS family_id,
          family_profiles.email AS family_email,
          family_profiles.phone AS family_phone,
          family_profiles.display_name AS family_display_name,
          family_profiles.image AS family_image,
          family_profiles.bio AS family_bio,
          family_profiles.address AS family_address,
          family_profiles.children AS family_children,
      
          sitter_profiles.id AS sitter_id,
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

      const result = await client.query(query, values)

      if (profileId && result.rows.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'No jobs found for the given profile' })
      }

      const camelCaseResult = convertKeysToCamel(result.rows)
      return formatJobs(camelCaseResult)
    }
    finally {
      await client.end()
    }
  }
  catch (e) {
    console.error(e)
    throw createError(`POSTGRES: ${e}`)
  }
})
