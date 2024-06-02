import http from 'http';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import carsRouter from './routes/cars.routes';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import knexInstance from '../config/database';
import { Model } from 'objection';

const app = express();
const port = 3000;
const swaggerDocument = YAML.load('openapi.yaml')

Model.knex(knexInstance);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cars", carsRouter);
app.use("/", authRouter);
app.use("/user", userRouter);
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`API is started on port ${port}`);
})