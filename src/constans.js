const PORT = 3000;
const HOSTNAME = 'localhost';
const saltRounds = 12;
const adminModelName = 'administrators';
const JWT_SECRET = 'service help admin panel';

const ROUTES = {
  test: '/test',
  ADMIN: {
    main: '/administrators',
    login: '/login-admin',   
    logout: '/logout-admin' 
  },
  GRAPHQL: {
    main: '/graphql',
  },
  DB: {
    main: 'mongodb://127.0.0.1:27017/oleh-db',
    devTest: 'mongodb://node_server:8T0s5Q9j@ds341847.mlab.com:41847/oleh-srore',
  }
}

const MESSAGES = {
  admin_not_registered: 'Administrator with this email not registered',
  wrong_pswrd: 'Incorrect password',
  cant_login: 'Can\'t login. Something went wrong...',
  cant_logout: 'Can\'t log out. Something went wrong...',
}


export {
  PORT, 
  HOSTNAME,
  adminModelName,
  saltRounds,
  ROUTES,
  MESSAGES,
  JWT_SECRET,
};