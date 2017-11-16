const express = require('express');
const cors = require('cors')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const verifyUser = require('./security');
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const setRoutes = require('./setRoutes');

//this is global variable
secretABCKey = crypto.randomBytes(128).toString('base64');

const microServer = express();
// parse application/x-www-form-urlencoded
microServer.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
microServer.use(bodyParser.json());
microServer.use(cors());

setRoutes(microServer, __dirname + '/api', secretABCKey, verifyUser);

//capture all err
microServer.use(function (err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
});

//connect to Mongodb
//localhost
mongoose.connect('mongodb://localhost/quanlynhansu', {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});
//mongolab
//mongoose.connect('mongodb://thapgan:thepmoi@ds049180.mongolab.com:49180/mgdbtest');

// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongodb is connected successfully');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongodb connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongodb connection is disconnected');
});

//init admin user
const User = require('./model/user');
const Frontend = require('./model/frontend');
const Role = require('./model/role');
User.findOne({ 'username': 'appAdmin' }, function (err, user) {
    if (!user) {
        var f_ids = []
        Frontend({
            title: 'Frontend Management',
            url: 'hub.frontends',
            description: 'Manage list of front-end funcs',
            activated: true,
            author: 'Hoang Nguyen'
        }).save(function (err, f) {
            f_ids.push(f._id);
            Frontend({
                title: 'Backend Management',
                url: 'hub.backends',
                description: 'Manage list of back-end funcs',
                activated: true,
                author: 'Hoang Nguyen'
            }).save(function (err, f) {
                f_ids.push(f._id);
                Frontend({
                    title: 'Role Management',
                    url: 'hub.roles',
                    description: 'Manage list of role',
                    activated: true,
                    author: 'Hoang Nguyen'
                }).save(function (err, f) {
                    f_ids.push(f._id);
                    Frontend({
                        title: 'User Management',
                        url: 'hub.users',
                        description: 'Manage list of user',
                        activated: true,
                        author: 'Hoang Nguyen'
                    }).save(function (err, f) {
                        f_ids.push(f._id);
                        Role({ title: 'Administrator', description: 'Quản trị hệ thống', activated: true, frontends: f_ids }).save(function (err, r) {
                            const salt = crypto.randomBytes(128).toString('base64');
                            const hashedPassword = crypto.createHmac('sha256', salt).update('admin123').digest('hex');
                            var admin = {
                                username: 'appAdmin',
                                hashedPass: hashedPassword,
                                fullname: 'Hoang Nguyen',
                                salt: salt,
                                active: true
                            }
                            admin.roles = [];
                            admin.roles.push(r._id);
                            User(admin).save(function (err, user) {
                                //console.log(user);
                                console.log('admin is created.');
                            });
                        });
                    });
                });
            });
        });
    }
});

microServer.listen(3000, () => { console.log('App listening on port 3000!')});
