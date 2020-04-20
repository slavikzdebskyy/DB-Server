import config from 'config';

import { HOSTNAME } from './constants';
import app from './app';

const PORT = config.get('port') || 3000;
app.listen(PORT, HOSTNAME, () => {
  console.log(`Running a GraphQL API server at http://${HOSTNAME}:${PORT}`);
});
