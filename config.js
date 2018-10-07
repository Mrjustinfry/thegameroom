let DATABASE_URL = 'mongodb://justinfry:thinkful101@ds115753.mlab.com:15753/blog-test';

exports.DATABASE_URL = process.env.DATABASE_URL ||
    'mongodb://localhost/blog';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/blog-test';
exports.PORT = process.env.PORT || 8080;