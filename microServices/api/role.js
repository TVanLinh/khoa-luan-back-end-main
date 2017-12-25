const Role = require('../model/role');
const RoleHistory = require('../model/roleHistory');

module.exports = {
    u_get_index: function () {
        return Role.find().populate({
            path: 'frontends',
            match: {activated: true},
            // select: 'title description'
        }).populate({
            path: 'backends',
            match: {activated: true},
            // select: 'title description'
        }).lean();
    },

    // post_create: function (role) {
    //     // console.log(role);
    //     return Role.find({title: role.title}).then(r => {
    //         if (r && !r.title) {
    //             return Role(role).save();
    //         }
    //     });
    //
    // },

    // post_update: function (role) {
    //     console.log("update role " + JSON.stringify(role));
    //     return Role.findByIdAndUpdate(role._id, role);
    // },

    u_post_delete: function (role) {
        return Role.findByIdAndRemove(role._id, function (err) {
        });
    },

    u_post_index: function (role, reason, username) {
        return Role.findByIdAndUpdate(role._id, role)
            .then(data => {
                return RoleHistory({
                    roleId: role._id,
                    type: 'Update',
                    reason: reason,
                    username: username
                }).save();
            })
            .then(log => {
                return log.roleId;
            })
    },
    u_put_index: function (role, reason, username) {
        console.log("Create role request " + role + "   " + reason + "\t" + username);
        return Role(role).save().then(role => {
            RoleHistory({
                roleId: role._id,
                type: 'Created',
                reason: reason,
                username: username
            }).save();
            return role;
        });
    },
    u_post_activate: function (roleId, reason, activated, username) {
        return Role.findById(roleId).then(
            role => {
                role.activated = activated;
                return role.save();
            }
        ).then(r => {
            return RoleHistory({
                roleId: r._id,
                type: activated ? 'activate' : 'disable',
                reason: reason,
                username: username
            }).save();
        });
    },
    u_get_activated: function () {
        return Role.find({activated: true}, 'title description').lean();
    }
};