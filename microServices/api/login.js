const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../model/user');

module.exports = {
    post_index: function (username, password) {
        return new Promise(function (resolve, reject) {
            if (username && password) {
                var token = null;
                User.findOne({ username: username, activated: true })
                    .then(user => {
                        if (user) {
                            var hashedPassword = crypto.createHmac('sha256', user.salt).update(password).digest('hex');
                            if (hashedPassword === user.hashedPass) {
                                token = jwt.sign({ userId: user._id, username: user.username }, secretABCKey, { expiresIn: '2h' });
                                return User.findById(user._id, '-_id username fullname roles').populate({
                                    path: 'roles',
                                    populate: { path: 'frontends', match: { activated: true }, select: '-_id title url' },
                                    match: { activated: true },
                                    select: '-_id title frontends'
                                });
                            } else return Promise.reject({ status: 401, messeage: 'Username, password not correct' });
                        } else return Promise.reject({ status: 401, messeage: 'Username, password not correct' });
                    })
                    .then(data => {
                        resolve({ user: data, token: token });
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                reject({ status: 400, messeage: 'Bad request' });
            }
        });
    }
}