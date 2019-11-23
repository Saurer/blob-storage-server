import { NowRequest, NowResponse } from '@now/node';

export type Endpoint = (req: NowRequest, res: NowResponse) => void;

export interface File {
    name: string;
    creationTime: string;
    lastModified: string;
    etag: string;
    contentLength: number;
}
