import { S3 } from 'aws-sdk'

const s3 = new S3({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
})

export function generatePresignedUrl(filename: string, filetype: string) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: filename,
    Expires: 60,
    ContentType: filetype,
    ACL: 'public-read',
  }

  return s3.getSignedUrlPromise('putObject', params)
}
