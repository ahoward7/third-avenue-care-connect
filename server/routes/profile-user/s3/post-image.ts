import { Buffer } from 'node:buffer'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

async function compressTo50Kb(inputBuffer: Buffer, targetSizeKB = 50, minQuality = 30) {
  const targetBytes = targetSizeKB * 1024
  let quality = 80

  const { width, height } = await sharp(inputBuffer).metadata()
  const size = Math.min(width!, height!)
  const left = Math.floor((width! - size) / 2)
  const top = Math.floor((height! - size) / 2)

  while (quality >= minQuality) {
    const resized = await sharp(inputBuffer)
      .extract({ left, top, width: size, height: size })
      .resize(500, 500)
      .jpeg({ quality })
      .toBuffer()

    if (resized.length <= targetBytes)
      return resized

    quality -= 5
  }

  return await sharp(inputBuffer)
    .extract({ left, top, width: size, height: size })
    .resize(500, 500)
    .jpeg({ quality: minQuality })
    .toBuffer()
}

export default defineEventHandler(async (event) => {
  const data = await readFormData(event)
  const file = data.get('file') as File
  const fileName = data.get('filename') as string

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const arrayBuffer = await file.arrayBuffer()

  const buffer = Buffer.from(arrayBuffer)

  const resizedBuffer = await compressTo50Kb(buffer)

  const bucketName = process.env.AWS_S3_BUCKET_NAME!
  const key = `profile-images/${Date.now()}-${fileName}`

  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: resizedBuffer,
    ContentType: 'image/jpeg',
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
