import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)


const region = "eu-north-1"
const bucketName = "my-website-uploads-sadhiq"
const accessKeyId = "AKIA5FTY6VOZB6TH4CWJ"
const secretAccessKey = "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"

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}