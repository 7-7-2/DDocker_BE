const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand
} = require('@aws-sdk/client-s3');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
});

const getPresignedUploadUrl = instance => async dir => {
  const signedUrl = await getSignedUrl(
    instance,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `assets/${dir}`
    }),
    { expiresIn: 20 }
  );
  return { url: signedUrl };
};

const getPresignedDeleteUrl = instance => async dir => {
  const signedUrl = await getSignedUrl(
    instance,
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `assets/${dir}`
    }),
    { expiresIn: 20 }
  );
  return { url: signedUrl };
};

const deleteAllFolderItems = instance => async folderPath => {
  const listObjectsResult = await instance.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: `assets/${folderPath}`
    })
  );
  const keys =
    listObjectsResult.Contents &&
    listObjectsResult.Contents.map(item => ({ Key: item.Key }));
  if (keys?.length) {
    await instance.send(
      new DeleteObjectsCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Delete: { Objects: keys }
      })
    );
  }
  return true;
};

module.exports = {
  getPresignedUploadUrl: getPresignedUploadUrl(r2),
  getPresignedDeleteUrl: getPresignedDeleteUrl(r2),
  deleteAllFolderItems: deleteAllFolderItems(r2)
};
