import expressGraphql from 'express-graphql';
import mongoose from 'mongoose';
import express from 'express';
// import mogoDBUrl from './credentials';
import schema from './grahql/shema';

mongoose.connect('mongodb://127.0.0.1:27017/oleh-db', {useNewUrlParser: true });

const app = express();

app.use('/', expressGraphql({
  schema: schema,
  graphiql: true,
}));

export default app;