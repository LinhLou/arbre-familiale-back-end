// import dotEnv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbconnecxion from './database/connexion.js';
import userRoutes from './routes/userRoutes.js';
import treeRoutes from './routes/treeRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import config from './config.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
const swaggerDocs = yaml.load('./api_doc.yaml');




// dotEnv.config();
dbconnecxion();

const Port = config.port || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tree', treeRoutes);
app.use('/api/v1/member', memberRoutes);


// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}


app.listen(Port, () => {
  console.log(`Listen to request at port ${Port}!`);
});