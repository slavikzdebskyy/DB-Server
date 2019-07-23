import expressGraphql from 'express-graphql';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import adminRoutes from './routes/adminRoutes';
import testRoutes from './routes/testsRoutes';
import schema from './grahql/shema';
import { ROUTES } from './constans';

mongoose.connect(ROUTES.DB.devTest, {useNewUrlParser: true });
// mongoose.connect(ROUTES.DB.main, {useNewUrlParser: true });

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
app.use(ROUTES.test, testRoutes);

export default app;