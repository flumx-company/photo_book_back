
const path = require('path') // eslint-disable-line
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, `.env`),
})

function env(key) {
  return envConfig.parsed[key] || process.env[key]
}

module.exports = {
  host: env('DB_HOSTNAME'),
  port: env('DB_PORT'),
  type: "mysql",
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  entities: [
    "dist/**/*.entity.js"
  ],
  seeds: ['dist/**/database/seeds/**/*.js'],
  factories: ['dist/**/database/factories/**/*.js'],
  // synchronize: true,
};