module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASS,
    database: 'plantDB',
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    use_env_variable: 'JAWSDB_URL'
  }
};
