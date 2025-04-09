import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export default defineEventHandler(async (event) => {
  const { key } = getQuery(event) as { key: string }

  if (!key) {
    throw createError({ statusCode: 400, statusMessage: 'Missing key' })
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  })

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 10 })

  return { imageUrl: signedUrl }
})
