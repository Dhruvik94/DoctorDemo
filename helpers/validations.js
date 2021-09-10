/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { jwt_secret, jwt_issuer, ENCRYPTION_KEY } = require('../config');
const TokenGenerator = require('uuid-token-generator');
const otpGenerator = require('otp-generator')
const DateDiff = require('date-diff');
const CryptoJS = require("crypto-js");
const moment = require('moment');
const uuid = require('uuid-random');
const md5 = require('md5');

/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = (
  id, title, email, role, first_name, last_name, mobile, address,
  language,
  domain_id) => {
  const token = jwt.sign({
    email,
    title,
    user_id: id,
    role,
    first_name,
    last_name,
    mobile,
    address,
    language,

    domain_id,

  },
    jwt_secret, { expiresIn: 60 * 60 * 24, issuer: jwt_issuer },
  );
  return token;
};

function isJson(str) {
  try {
    if (str) {
      JSON.parse(str);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

const generateSessionToken = () => {
  const token = new TokenGenerator(256, TokenGenerator.BASE62);
  return token.generate();
}

const generateOTP = () => {
  return otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
}

const dateDifference = (date1, date2) => {
  return new DateDiff(date1, date2);
}

const decodeJWTToken = (token) => {
  options = {
    expiresIn: 60 * 60 * 24,
    issuer: jwt_issuer
  };
  return jwt.verify(token, jwt_secret, options);
}

const getUTCDate = () => {
  var date = new Date();
  var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

  return new Date(now_utc);
}

const getTodayDateWith1DayPlus = (date) => {
  return moment(new Date(date)).format('YYYY-MM-DD')
}

const getLogFileName = () => {
  var date = moment(new Date()).format('YYYY-MM-DD');
  return "telemaster_" + date + ".log";
}

const getUTCDateTime = () => {
  var d1 = new Date();
  return d1.toUTCString();
}

const getUTCDateInString = () => {
  return moment(new Date()).format('YYYY-MM-DD');
}

const convertH2M = (timeInHour) => {
  var timeParts = timeInHour.split(":");
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
}

const convertM2H = (timeInMinute) => {
  var hours = Number.parseInt(timeInMinute / 60);
  var minutes = timeInMinute % 60; // t is the time in minutes

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

const getHourFromNumber = (call_back, appoinment_time) => {
  let stringToTime = moment(call_back, "LT").format('HHmm');
  let appoinmentTime = moment(appoinment_time, "HH:mm").format('HHmm');
  let t = appoinmentTime - stringToTime
  return moment(t, 'Hmm').format('HH:mm')
}

const convert_positive = (t) => {
  // Check the number is negative 
  if (t < 0) {
    // Multiply number with -1 
    // to make it positive 
    t = t * -1;
  }
  // Return the positive number 
  return t;
}

const encrypt = (data) => {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
  let result = ciphertext.toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l');
  return result;
}

const decrypt = (data) => {
  var decryptedData = null;
  if (data != "null" && data != null && data != undefined) {
    ciphertext = data.replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
    var bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  return decryptedData
}

const generateUniqueID = () => {
  return Date.now();
}

const getMeetingID = () => {
  var pin = Date.now().toString();
  let str = pin.substring(pin.length - 5);
  var res = str.charAt(0);

  if (res == "0") {
    let d = new Date();
    let tar = d.getDate();
    let stri = tar.toString();
    str = str.replace(/^0+/, stri);
    console.log(str)
    return str
  }
  return str
}

const generatePersonalPIN = (length) => {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generateOrgnaizationInitial = () => {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generateRandomPasswordString = () => {
  var result = '';
  var characters = '>?|}{ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const encryptLinkData = async (data) => {

  try {
    return encrypt(data);
  }
  catch (e) {
    throw e;
  }
}

const generateUUID = () => {
  return uuid();
}

const encryptMD5 = (value) => {
  return md5(value);
}


let validations = {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  generateUserToken,
  generateSessionToken,
  generateOTP,
  dateDifference,
  decodeJWTToken,
  getUTCDate,
  getUTCDateTime,
  getUTCDateInString,
  convertH2M,
  convertM2H,
  getHourFromNumber,
  convert_positive,
  encrypt,
  decrypt,
  generateUniqueID,
  generatePersonalPIN,
  getTodayDateWith1DayPlus,
  generateOrgnaizationInitial,
  generateRandomPasswordString,
  encryptLinkData,
  getMeetingID,
  generateUUID,
  getLogFileName,
  encryptMD5
}

module.exports = validations;
