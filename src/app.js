import expressGraphql from 'express-graphql';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import adminRoutes from './routes/adminRoutes';
import schema from './grahql/shema';
import { ROUTES } from './constans';

mongoose.connect(ROUTES.DB.devTest, {useNewUrlParser: true });
// mongoose.connect(ROUTES.DB.main, {useNewUrlParser: true });

const app = express();

// app.use(ROUTES.GRAPHQL.main, expressGraphql({
//   schema: schema,
//   graphiql: true,
// }));

const corsOptions = {
  'Content-Type': 'text/plain',
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}



app.use(bodyParser.urlencoded({extamded: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.set('view engine', 'ejs');

app.use(ROUTES.ADMIN.main, adminRoutes);

export default app;