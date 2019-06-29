import expressGraphql from 'express-graphql';
import mongoose from 'mongoose';
import express from 'express';
// import mogoDBUrl from './credentials';
import schema from './grahql/shema';

mongoose.connect('mongodb://node_server:8T0s5Q9j@ds341847.mlab.com:41847/oleh-srore', {useNewUrlParser: true });

const app = express();

app.use('/', expressGraphql({
  schema: schema,
  graphiql: true,
}));

export default app;