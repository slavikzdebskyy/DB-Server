const PORT = 3000;
const HOSTNAME = 'localhost';
const saltRounds = 12;
const SECURITY_CODE_LENGTH = 6;
const CRYPTO_IMAGE_NAME_LENGTH = 16;

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
  images: 'images',
  productImage: 'ProductImage'
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
  IMAGES: {
    main: '/images',
    uploadAdmin: '/add-remove-avatar-admin',
    massAdd: '/add-images-mass',
    getImage: '/image',
    delImage: '/remove-image',
    delMassImage: '/remove-images-mass',
    paramFileName: 'filename',
    allImages: '/all-images',
    paramId: 'id',
  },
  GRAPHQL: {
    main: '/graphql',
  },  
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
  pswrdChanged: 'Password successfully changed',
  noImgeErr: 'No image exist',
  noFileErr: 'No file exist',  
  noFilesErr: 'No files exist',
}


export {
  PORT, 
  HOSTNAME,
  MODEL_NAMES,
  saltRounds,
  ROUTES,
  MESSAGES,
  SECURITY_CODE_LENGTH,
  TYPE_NAMES,
  CRYPTO_IMAGE_NAME_LENGTH,
};