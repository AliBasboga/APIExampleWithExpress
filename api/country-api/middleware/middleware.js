import {rateLimit} from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    lookup: 'connection.remoteAddress'
})