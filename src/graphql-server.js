import dotenv from 'dotenv';

import { HOSTNAME } from './constants';
import app from './app';

dotenv.config();

app.listen(process.env.PORT, HOSTNAME, () => {
  console.log(`Running a GraphQL API server at http://${HOSTNAME}:${process.env.PORT}`);
});
