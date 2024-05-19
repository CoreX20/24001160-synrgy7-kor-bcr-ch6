import http from 'http';
import express from 'express';
import carsRouter from './routes/cars.routes';
import knex from 'knex';
import { Model } from 'objection';

const app = express();
const port = 3000;
const knexInstance = knex({
    client: "pg",
    connection: {
        database : "bcr",
        user:"admin",
        password : "123456",
        port: 5432
    }
})
Model.knex(knexInstance);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cars", carsRouter)

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API is started on port ${port}`);
})