import { protect } from '../lib/auth';
import { uploadBlobBuffer } from '../lib/client';

export default protect(async (req, res) => {
    const result = await uploadBlobBuffer(
        req.body.name,
        new Buffer(req.body.data, 'base64')
    );

    return res.status(200).json({
        success: true,
        data: {
            name: req.body.name,
            creationTime: result.lastModified,
            lastModified: result.lastModified,
            etag: result.etag,
            contentLength: Number(result.contentLength)
        }
    });
});
