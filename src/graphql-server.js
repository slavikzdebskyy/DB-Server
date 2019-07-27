import app from './app';
import { PORT, HOSTNAME } from './constants';

const currPort = process.env.PORT || PORT;

app.listen(PORT, HOSTNAME, () => {
  const potName = process.env.PORT ? process.env.PORT : `http://${HOSTNAME}:${currPort}/`;
  console.log(`Running a GraphQL API server at ${potName}`);
});