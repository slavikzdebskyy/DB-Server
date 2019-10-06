import expressGraphql from 'express-graphql';
import bodyParser from 'body-parser';
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import { ROUTES, TYPE_NAMES } from './constants';
import productRoutes from './routes/product-routes';
import imagesRoutes from './routes/image-routes.js';
import adminRoutes from './routes/admin-routes';
import testRoutes from './routes/tests-routes';
import schema from './grahql/shema';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.DB);

export const conn = mongoose.createConnection(process.env.DB);

export let gfs;
conn.once('open', () => {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection(TYPE_NAMES.images);
});



const app = express();

const corsOptions = {  
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
const graphqlConfig = {
  schema: schema,
  graphiql: true,
}


app.use(ROUTES.GRAPHQL.main, cors(corsOptions), expressGraphql(graphqlConfig));
app.use(bodyParser.urlencoded({extamded: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.set('view engine', 'ejs');

app.use(ROUTES.ADMIN.main, adminRoutes);
app.use(ROUTES.IMAGES.main, imagesRoutes);
app.use(ROUTES.PRODUCT.main, productRoutes);
app.use(ROUTES.test, testRoutes);

export default app;