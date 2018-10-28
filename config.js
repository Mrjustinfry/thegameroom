'use strict';
const DATABASE_URL = 'mongodb://justinfry:thinkful101@ds143143.mlab.com:43143/thegameroom';
const TEST_DATABASE_URL = 'mongodb://justinfry:thinkful101@ds115753.mlab.com:15753/blog-test';

exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    DATABASE_URL ||
    'mongodb://justinfry:thinkful101@ds143143.mlab.com:43143/thegameroom';

exports.TEST_DATABASE_URL =
    process.env.TEST_DATABASE_URL ||
    TEST_DATABASE_URL ||
    'mongodb://justinfry:thinkful101@ds115753.mlab.com:15753/blog-test';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';