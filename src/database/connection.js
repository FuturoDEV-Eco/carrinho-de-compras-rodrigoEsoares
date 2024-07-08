const {Pool} = require('pg')

const connection = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '*****',
    database: 'lab_commerce'
})

module.exports = connection
