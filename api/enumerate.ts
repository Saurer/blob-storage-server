import { File } from '../types';
import { listBlobs } from '../lib/client';
import { protect } from '../lib/auth';

export default protect(async (_req, res) => {
    const blobs = await listBlobs();
    const data = blobs.entries.map<File>(blob => ({
        name: blob.name,
        creationTime: blob.creationTime,
        lastModified: blob.lastModified,
        etag: blob.etag,
        contentLength: Number(blob.contentLength)
    }));

    return res.status(200).json({
        success: true,
        data
    });
});
