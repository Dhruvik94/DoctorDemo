'use strict';
const Sequelize = require('sequelize');
const config = require("../config");
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-very-own-namespace');
Sequelize.useCLS(namespace);
const seedData = require('../helpers/seedData')

// local connection settings 
var pool = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: config.DIALECT,
  logging: false,
  define: {
    timestamps: false
  }
});

var sequelize = pool;

// checks the database connectivity
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

// create the modal instance & connnect modal instance to database
db.users = require('../model/users.model')(sequelize, Sequelize);
db.domain = require('../model/domain.model')(sequelize, Sequelize);
db.verify_otp = require('../model/verify_otp.model')(sequelize, Sequelize);
db.pinpolicy = require('../model/pinpolicy.model')(sequelize, Sequelize);
db.passwordpolicy = require('../model/passwordpolicy.model')(sequelize, Sequelize);
db.theme_settings = require('../model/theme_settings.model')(sequelize, Sequelize);
db.authenticate = require('../model/authenticat')(sequelize, Sequelize);


db.users.belongsTo(db.domain, { foreignKey: 'domain_id', targetKey: 'id' });
db.pinpolicy.belongsTo(db.domain, { foreignKey: 'domain_id', targetKey: 'id' });
db.passwordpolicy.belongsTo(db.domain, { foreignKey: 'domain_id', targetKey: 'id' });
db.authenticate.belongsTo(db.domain, { foreignKey: 'domain_id', targetKey: 'id' });
db.domain.hasOne(db.passwordpolicy, { foreignKey: 'domain_id', targetKey: 'id' });
db.domain.hasOne(db.authenticate, { foreignKey: 'domain_id', targetKey: 'id' });


db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
  seedData.initial();
});

module.exports = db;
