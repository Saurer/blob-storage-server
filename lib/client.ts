import { BlobService } from 'azure-storage';
import { Readable } from 'stream';

const containerName = 'default';
const client = new BlobService(process.env.azure_secret!);

export const uploadBlobBuffer = async (name: string, buffer: Buffer) => {
    const stream = new Readable();
    stream._read = () => {
        /* NOP */
    };
    stream.push(buffer);
    stream.push(null);

    return await uploadBlobStream(name, stream, buffer.length);
};

export const uploadBlobStream = (
    name: string,
    stream: Readable,
    streamLength: number
) =>
    new Promise<BlobService.BlobResult>((resolve, reject) => {
        client.createBlockBlobFromStream(
            containerName,
            name,
            stream,
            streamLength,
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });

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
