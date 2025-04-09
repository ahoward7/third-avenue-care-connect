import pgk from 'pg'

const { Client } = pgk

export default () => {
  return new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
  })
}
