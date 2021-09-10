const APP_ENV = (process.env.NODE_ENV) || 'dev';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


const DB_NAME = {
  'dev': 'telemaster',
  'test': 'doctor-app',
  'production': 'telemaster',
};

const DB_USERNAME = {
  'dev': 'postgres',
  'test': 'postgres',
  'production': 'telemaster',
};

const DB_PASSWORD = {
  'dev': 'root',
  'test': 'root',
  'production': 'ogV2Rpwb1xh2wS5N',
};

const DB_HOST = {
  // 'dev': '167.99.237.182',
  'dev': '161.35.123.43',
  'test': 'https://stage.doctorapp.com',
  'production': '127.0.0.1'
};

const DIALECT = {
  'dev': 'postgres',
  'test': 'postgres',
  'production': 'postgres'
};

const EMAIL = {
  'dev': 'noreplycolpbx@gmail.com',
  'test': 'noreplycolpbx@gmail.com',
  'production': 'noreplycolpbx@gmail.com',
};

const EMAIL_PASSWORD = {
  'dev': 'voipsell456!@#',
  'test': 'voipsell456!@#',
  'production': 'voipsell456!@#',
};

const URL_ENDPOINT = {
  'dev': 'http://localhost:3000',
  'test': 'https://stage.doctorapp.com',
  'production': 'https://tele-prt.networklab.support',
};

const RTC_ENDPOINT = {
  'dev': 'http://localhost:3000/videocall?value=',
  'test': 'https://stage.doctorapp.com/phn/app?value=',
  'production': 'https://tele-prt.networklab.support/videocall?value=',
}

const APPOINMENT_ENDPOINT = {
  'dev': 'http://localhost:3000',
  'test': 'https://stage.doctorapp.com',
  'production': 'https://tele-prt.networklab.support',
}

const SIGNUP_ENDPOINT = {
  'dev': 'http://localhost:3000/invitation/confirm-email?value=',
  'test': 'https://stage.doctorapp.com/invitation/confirm-email?value=',
  'production': 'https://tele-prt.networklab.support/invitation/confirm-email?value=',
}

const PASSWORD_RESET_ENDPOINT = {
  'dev': 'http://localhost:3000/change-password?value=',
  'test': 'https://stage.doctorapp.com/change-password?value=',
  'production': 'https://tele-prt.networklab.support/change-password?value=',
}

const JWT_SECRET = {
  'dev': 'I_LOVE_DOCTOR_APP',
  'test': 'I_LOVE_DOCTOR_APP',
  'production': 'ss71AUVotev5geHS',
};

const JWT_ISSUER = {
  'dev': 'doctorapp',
  'test': 'doctorapp',
  'production': 'ss71AUVotev5geHS',
};

const EMAIL_HOST = {
  'dev': 'smtp.gmail.com',
  'test': 'smtp.gmail.com',
  'production': 'smtp.gmail.com',
};

const EMAIL_PORT = {
  'dev': 587,
  'test': 465,
  'production': 465,
};

const EMAIL_SECURE = {
  'dev': false,
  'test': true,
  'production': true,
};

const ENCRYPTION_KEY = {
  'dev': "I_LOVE_DOCTOR_APP",
  'test': "I_LOVE_DOCTOR_APP",
  'production': "ss71AUVotev5geHS",
};

const CONTACTPOINTS = {
  'dev': ['167.172.131.179'],
  'test': ['127.0.0.1:9042'],
  'production': ['10.142.0.16:9042']
}

const LOCAL_DATA_CENTER = {
  'dev': 'datacenter1',
  'test': 'datacenter1',
  'production': 'dc1'
}

const KEYSPACE = {
  'dev': 'telemaster',
  'test': 'telemaster',
  'production': 'telemaster'
}

const BASE_URL_FILE_SYSTEM = {
  'dev': process.cwd(),
  'test': process.cwd(),
  'production': process.cwd() + "var/www/telemaster/backend",
}



const APP_LOGO = {
  'dev': 'http://localhost:8080/api/organization/app-logo',
  'teste': 'http://localhost:8080/api/organization/app-logo',
  'production': 'https://tele-prt.networklab.support/api/organization/app-logo'
}


var transporter = nodemailer.createTransport(smtpTransport({
  host: EMAIL_HOST[APP_ENV],
  port: EMAIL_PORT[APP_ENV],
  secure: EMAIL_SECURE[APP_ENV], // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user: EMAIL[APP_ENV], // generated ethereal user
    pass: EMAIL_PASSWORD[APP_ENV] // generated ethereal password
  }
}));


module.exports = {
  jwt_secret: JWT_SECRET[APP_ENV],
  jwt_issuer: JWT_ISSUER[APP_ENV],
  transporter: transporter,
  fromMail: EMAIL[APP_ENV],
  URL: URL_ENDPOINT[APP_ENV],
  RTC_URL: RTC_ENDPOINT[APP_ENV],
  APPOINMENT_ENDPOINT: APPOINMENT_ENDPOINT[APP_ENV],
  SIGNUP_ENDPOINT: SIGNUP_ENDPOINT[APP_ENV],
  PASSWORD_RESET_ENDPOINT: PASSWORD_RESET_ENDPOINT[APP_ENV],
  DB_NAME: DB_NAME[APP_ENV],
  DB_USERNAME: DB_USERNAME[APP_ENV],
  DB_PASSWORD: DB_PASSWORD[APP_ENV],
  DB_HOST: DB_HOST[APP_ENV],
  DIALECT: DIALECT[APP_ENV],
  ENCRYPTION_KEY: ENCRYPTION_KEY[APP_ENV],
  BASE_URL_FILE_SYSTEM: BASE_URL_FILE_SYSTEM[APP_ENV],
  APP_LOGO: APP_LOGO[APP_ENV]
};
