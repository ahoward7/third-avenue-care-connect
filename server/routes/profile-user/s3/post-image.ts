import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default defineEventHandler(async (event) => {
  const data = await readFormData(event)
  const file = data.get('file') as File
  const fileName = data.get('filename') as string

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const arrayBuffer = await file.arrayBuffer()
  // eslint-disable-next-line node/prefer-global/buffer
  const buffer = Buffer.from(arrayBuffer)

  const bucketName = process.env.AWS_S3_BUCKET_NAME!
  const key = `profile-images/${Date.now()}-${fileName}`

  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  })

  await s3.send(putCommand)

  const getCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  const signedUrl = await getSignedUrl(s3, getCommand, {
    expiresIn: 60 * 10,
  })

  return { imageUrl: key, signedUrl }
})
