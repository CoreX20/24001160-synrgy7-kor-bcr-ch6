import knex from 'knex';
const knexInstance = knex({
    client: "pg",
    connection: {
        database : "bcr",
        user:"admin",
        password : "123456",
        port: 5432
    }
})

export default knexInstance;