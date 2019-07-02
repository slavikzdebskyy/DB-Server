const PORT = 3000;
const HOSTNAME = 'localhost';
const saltRounds = 12;
const adminModelName = 'administrators';

const ROUTES = {
  ADMIN: {
    main: '/administrators',
    login: '/login-admin',
  },
  GRAPHQL: {
    main: '/graphql',
  },
  DB: {
    main: 'mongodb://127.0.0.1:27017/oleh-db',
    devTest: 'mongodb://node_server:8T0s5Q9j@ds341847.mlab.com:41847/oleh-srore',
  }
}


export {
  PORT, 
  HOSTNAME,
  adminModelName,
  saltRounds,
  ROUTES,
};