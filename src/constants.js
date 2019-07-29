const PORT = 3000;
const HOSTNAME = 'localhost';
const saltRounds = 12;
const SECURITY_CODE_LENGTH = 6;
const JWT_SECRET = 'service help admin panel';

const MODEL_NAMES = {
  adminModelName: 'administrators',
  laptopModelName: 'laptops',
  pc: 'ps',
  monitor: 'monitor'
}

const TYPE_NAMES = {
  laptop: 'Laptop',
  monitor: 'Monitor',
  pc: 'PC',
}

const ROUTES = {
  test: '/test',
  ADMIN: {
    main: '/administrators',
    login: '/login-admin',   
    restorePswrd: '/restore-password',
    checkCode: '/check-security-code',
    changePassword: '/change-password',
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
  admin_exist: 'Administrator with this email already exists',
  db_error: 'Error with data base',
  code_success: 'Security code sent successfully',
  wrong_code: 'Wrong security code',
  success: 'Success',
  pswrdsNotEqual: 'Passwords not equal',
  pswrdChanged: 'Password successfully changed'
}


export {
  PORT, 
  HOSTNAME,
  MODEL_NAMES,
  saltRounds,
  ROUTES,
  MESSAGES,
  JWT_SECRET,
  SECURITY_CODE_LENGTH,
  TYPE_NAMES,
};