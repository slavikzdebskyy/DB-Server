import expressGraphql from 'express-graphql';
import mongoose from 'mongoose';
import express from 'express';
import mogoDBUrl from './credentials';
import schema from './grahql/shema';

mongoose.connect(mogoDBUrl, {useNewUrlParser: true });

const app = express();

app.use('/graphql', expressGraphql({
  schema: schema,
  graphiql: true,
}));

export default app;