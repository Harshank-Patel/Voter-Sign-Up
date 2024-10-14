import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_S3_REGION
});

export const uploadToS3 = (file, fileName, county) => {
    const params = {
        Bucket: 'voter-forms',  // Replace with your S3 bucket name
        Key: `${county}/${fileName}`, // Store the file in a folder named 'voter-pdfs'
        Body: file,
        ContentType: 'application/pdf',
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error("Error uploading file:", err);
                reject(err);
            } else {
                console.info("File uploaded successfully:", data.Location);
                resolve(data.Location);
            }
        });
    });
};