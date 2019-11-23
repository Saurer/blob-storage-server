import { Endpoint } from '../types';

const storageKeys = (process.env.storage_keys || '').split(',');

export const isAuthorized = (storageKey: string) =>
    -1 !== storageKeys.indexOf(storageKey);

export const protect = (endpoint: Endpoint) => {
    const handler: Endpoint = (req, res) => {
        if (!req.body.storageKey || !isAuthorized(req.body.storageKey)) {
            return res.status(403).json({
                success: false
            });
        } else {
            return endpoint(req, res);
        }
    };

    return handler;
};
