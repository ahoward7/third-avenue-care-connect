import { createError, defineEventHandler } from 'h3'
import { formatJobs } from '../../utils/formatJobs'
import { convertKeysToCamel } from '../../utils/snakeToCamel'
import TACC from '../../utils/taccClient'

export default defineEventHandler(async () => {
  try {
    const client = TACC()

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
