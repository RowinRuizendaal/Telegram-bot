const Users = require("../models/user.js");

const createUser = async({ name, id }) => {
    // check if user already exists
    const validUser = await getUser({ id });

    if (!validUser) {
        const user = await Users.create({
            name: name,
            id: id,
        });

        return user;
    } else {
        return false;
    }
};

const getUser = async({ id }) => {
    const user = await Users.findOne({
        id: id,
    });

    return user;
};

const updateToken = async({ id, token }) => {
    const user = await Users.findOneAndUpdate({
        id: id,
    }, {
        token: token,
    });

    return user;
};

module.exports = {
    createUser,
    getUser,
    updateToken,
};