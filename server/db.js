const Pool = require("pg").Pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

// const pool = new Pool({
//     user: "postgres",
//     database: "node_auth",
//     password: process.env.DB_PASSWORD,
//     host: "localhost",
//     port: 5432,
    
// })


module.exports = pool