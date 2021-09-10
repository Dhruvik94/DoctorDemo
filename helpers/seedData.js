var bcrypt = require("bcryptjs");

const initial = async () => {
    try {
        var sequelize = require('../config/sequelize');
        const helpers = require('./validations')

        var User = await sequelize.users.findOne({ where: { email: "savaliyachirag183@gmail.com" } });
        if (!User) {
            User =
                await sequelize.users.create({
                    first_name: "Super",
                    last_name: "Admin",
                    email: "savaliyachirag183@gmail.com",
                    created_by: "0",
                    role: "SUPER_ADMIN",
                    user_type: "SUPER_ADMIN",
                    personal_pin: "123456",
                    mobile: "1234567891",
                    address: "322 silver bussiness hub",
                    password: bcrypt.hashSync("admin", 10),
                    is_active: true,
                    is_confirmed: true,
                    language: "en",
                    personal_pin: "123456",
                    signup_token: new Date().getTime(),
                    created_at: helpers.getUTCDateTime(),
                    updated_at: helpers.getUTCDateTime()
                });
        }
    } catch (e) {
        console.log(e)
    }
}

var seedData = {
    initial
}

module.exports = seedData