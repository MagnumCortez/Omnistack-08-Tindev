const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loogedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loogedDev.likes } },
                { _id: { $nin: loogedDev.dislikes } },
            ],
        });

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { login, name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name: name || login,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    }
};