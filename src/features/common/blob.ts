"use server"

import { promises as fs } from 'fs';

import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME ? process.env.AZURE_STORAGE_ACCOUNT_NAME : "mcc";
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY ? process.env.AZURE_STORAGE_ACCOUNT_KEY : "mcc";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`, 
    sharedKeyCredential
);

export async function getBlob(fileName: string) {  

    const containerName = 'mcc';

    // create container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // create blob client
    const blobClient = containerClient.getBlockBlobClient(fileName);

    if (!(await blobClient.exists())) {
        const content = JSON.stringify({
            "name": "MyCompanyGpt"
        });
        await blobClient.upload(content, content.length);
    }

    // download file
    return await blobClient.downloadToBuffer();
}

export async function writeBlob(data: any) {  

    const containerName = 'mcc';
    const fileName = 'customization.json';

    // create container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // create blob client
    const blobClient = containerClient.getBlockBlobClient(fileName);

    await blobClient.deleteIfExists();

    // download file
    return await blobClient.upload(JSON.stringify(data), JSON.stringify(data).length);
}

export async function getLogoData(fileName:string) {
    
    const containerName = 'mcc';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);

    if (!(await blobClient.exists())) {
        const fileContents = await fs.readFile('public/obungi_logo.png', 'base64');
        return fileContents;
    }

    const response = await blobClient.download();
    
    const readableStream = response.readableStreamBody;
    
    // Read the stream and convert it to a Buffer
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    // Convert Buffer to base64
    const base64Data = buffer.toString('base64');
    
    return base64Data;
}

export async function uploadLogo(formData: FormData) {

    const containerName = 'mcc';
    //const fileName = formData.get('file')['name']
    const fileName = 'logo.jpg'

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);

    await blobClient.deleteIfExists();
    // Convert FormData to ArrayBuffer
    const formDataArrayBuffer = await (formData.get("file") as Blob).arrayBuffer();

    await blobClient.upload(formDataArrayBuffer, formDataArrayBuffer.byteLength);

    console.log(`Image uploaded successfully. Blob URL: ${blobClient.url}`);
    return fileName;
}


