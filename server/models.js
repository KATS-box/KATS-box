const { Pool } = require('pg')

const PG_URI = "postgres://cygehood:14IqN5HZbmBkrKX1ABNayUU4jHIUqm1g@batyr.db.elephantsql.com/cygehood"

const pool = new Pool({
    connectionString: PG_URI
})

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback)
    }
}