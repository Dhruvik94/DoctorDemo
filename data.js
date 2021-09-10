const sequelize = require('./config/sequelize');
const faker = require('faker');
var bcrypt = require("bcryptjs");
const role = require('./helpers/role');
const user_type = require('./helpers/user_type');
const helpers = require('./helpers/validations')



const data = async () => {

    for (let i = 0; i < 50; i++) {
        let domain = {
            domain_name: faker.internet.domainName(),
            user_name: faker.internet.userName(),
            password: faker.internet.password(5, true),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            address: faker.address.streetAddress(),
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        }
        let data = await sequelize.domain.create(domain)

        let siteAdmindata = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync("123", 10),
            mobile: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            domain_id: data.id,
            personal_pin: "123",
            language: "en",
            created_by: 1,
            is_active: true,
            is_confirmed: true,
            created_at: helpers.getUTCDateTime(),
            updated_at: helpers.getUTCDateTime(),
            role: role.SITE_ADMIN,
            signup_token: new Date().getTime(),
            user_type: user_type.SITE_ADMIN
        }

        let siteAdmin = await sequelize.users.create(siteAdmindata)
        console.log(siteAdmin)


        let passwordPolicy = {
            digits: true,
            letters: true,
            symbols: true,
            special_characters: true,
            uppercase: true,
            lowercase: true,
            days_rotate: 28,
            minimum_length: 1,
            maximum_length: 100,
            domain_id: data.id,
            is_active: true,
            created_at: helpers.getUTCDateTime(),
            updated_at: helpers.getUTCDateTime(),
        }

        let passwordPolicyData = await sequelize.passwordpolicy.create(passwordPolicy)
        console.log(passwordPolicyData)
    }
}


data()