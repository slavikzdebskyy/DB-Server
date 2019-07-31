import expressGraphql from 'express-graphql';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import grid from 'gridfs-stream';

import adminRoutes from './routes/admin-routes';
import testRoutes from './routes/tests-routes';
import imagesRoutes from './routes/image-routes.js';
import { ROUTES, TYPE_NAMES } from './constants';
import schema from './grahql/shema';

// mongoose.connect(ROUTES.DB.devTest, {useNewUrlParser: true });
mongoose.connect(ROUTES.DB.main, {useNewUrlParser: true });

// const conn = mongoose.createConnection(ROUTES.DB.devTest);
const conn = mongoose.createConnection(ROUTES.DB.main);

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
app.use(ROUTES.test, testRoutes);

export default app;