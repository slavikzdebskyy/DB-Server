const HOSTNAME = 'localhost';
const saltRounds = 12;
const SECURITY_CODE_LENGTH = 6;
const CRYPTO_IMAGE_NAME_LENGTH = 16;

const MODEL_NAMES = {
  adminModelName: 'administrators',
  laptopModelName: 'laptops',
  pc: 'ps',
  monitor: 'monitor'
};

const TYPE_NAMES = {
  laptop: 'Laptop',
  monitor: 'Monitor',
  pc: 'PC',
  images: 'images',
  productImage: 'ProductImage',
  productInputImage: 'ProductInputImage'
};

const ROUTES = {
  test: '/test',
  main: '/api',
  ADMIN: {
    main: '/api/administrators',
    login: '/login-admin',   
    restorePswrd: '/restore-password',
    checkCode: '/check-security-code',
    changePassword: '/change-password',
  },
  IMAGES: {
    main: '/api/images',
    uploadAdmin: '/add-remove-avatar-admin',
    massAdd: '/add-images-mass',
    getImage: '/image',
    delImage: '/remove-image',
    delMassImage: '/remove-images-mass',
    paramFileName: 'filename',
    allImages: '/all-images',
    paramId: 'id',
    setHeadImage: '/set-head-image'
  },
  GRAPHQL: {
    main: '/api/graphql',
  },
  PRODUCT: {
    main: '/api/product',
    findOne: '/find-one',
    productId: 'product_id',
  }
};

const MESSAGES = {
  admin_not_registered: 'Administrator with this email not registered',
  cant_login: 'Can\'t login. Something went wrong...',
  cant_logout: 'Can\'t log out. Something went wrong...',
  admin_exist: 'Administrator with this email already exists',
  db_error: 'Error with data base',
  code_success: 'The code has been sent to your email. Please check it and enter that code into the form.',
  wrong_code: 'Wrong security code',
  restore_pswrd_success: 'The Password has been sent to your email. Please check it.',
  success: 'Success',
  pswrdsNotEqual: 'Passwords not equal',
  pswrdChanged: 'Password successfully changed',
  noImgeErr: 'No image exist',
  noFileErr: 'No file exist',  
  noFilesErr: 'No files exist',
  wrong_pswrd: 'Can\'t login. Wrong password',
  incorrect_email: 'Incorrect email',
  length_pwrd: 'Min password\'s length should be 6 symbols',
  bad_request: 'Bad request',
  server_error: 'Server error'
};


export {
  HOSTNAME,
  MODEL_NAMES,
  saltRounds,
  ROUTES,
  MESSAGES,
  SECURITY_CODE_LENGTH,
  TYPE_NAMES,
  CRYPTO_IMAGE_NAME_LENGTH,
};
