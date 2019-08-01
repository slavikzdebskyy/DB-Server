import dotenv from 'dotenv';
import path from 'path';

import { HOSTNAME } from './constants';
import app from './app';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.listen(process.env.PORT, HOSTNAME, () => {
  console.log(`Running a GraphQL API server at http://${HOSTNAME}:${process.env.PORT}`);
});
