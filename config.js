//let DATABASE_URL = 'mongodb://justinfry:thinkful101@ds115753.mlab.com:15753/blog-test';


'use strict';
exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://justinfry:thinkful101@ds115753.mlab.com:15753/blog-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';