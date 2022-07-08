module.exports = {
  development: {
    username: 'root',
    password: 'Awerty1212!',
    database: 'COWORK',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: 'mysql'
  },
};

