"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (error) {
            return next(new Error(`Invalid content: ${error.message}`));
        }
    }
    return next();
};
