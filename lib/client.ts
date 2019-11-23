import { BlobService } from 'azure-storage';

const containerName = 'default';
const client = new BlobService(process.env.azure_secret!);

// export const uploadBlob = (name: string, fileName: string) =>
//     new Promise((resolve, reject) => {
//         client.createBlockBlobFromLocalFile(
//             containerName,
//             name,
//             fileName,
//             (err, result) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             }
//         );
//     });

export const listBlobs = () =>
    new Promise<BlobService.ListBlobsResult>((resolve, reject) => {
        client.listBlobsSegmented(containerName, null!, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
