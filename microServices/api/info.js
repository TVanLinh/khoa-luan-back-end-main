const Info = require('../model/info');
module.exports = {


    get_index: function () {
        var cv = new Info({
            username: "Tran Van Linh",
            cv: {
                fullName: "",
                nameOther: "",
                sex: "",
                email: "",
                phone: "",
                placeBirth: {city: "", district: "", guild: ""},
                homeTown: {city: "", district: "", guild: ""},
                hashNation: true,
                nation: "",
                identity: {identityNumber: "", dateRange: "", placeRange: ""},
                placeRegisterHouseHold: "",//noi dang ki ho khau thuong tru
                policyObject: "",
                bloodGroup: ""
            }

        });
        // Info.remove({staffCode: "appAdmin"}, function (err) {
        //
        // });
        return Info.find();
    },


    //---so yeu li lich -------------------------------
    u_get_cv: function (username) {
        // console.log(username);
        return Info.findOne({staffCode: username});
    },

    u_post_cv: function (data) {
        // console.log(data);

        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.cv = data['cv'];
                return info.save();
            }
        });
    },

    // quan doi quan ngu dang doan cong  doan
    u_post_armypug: function (data) {
        // console.log(data);
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.armyPUG = data['armyPUG'];
                return info.save();
            }
        });
    },

    u_get_armypug: function (username) {
        // console.log(username);
        return Info.findOne({staffCode: username}, "-_id armyPUG");
    },
    //------------------------------------------------

    //quan he gia dinh
    u_post_family: function (data) {
        console.log('reached');
        console.log(data);
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.family = data['family'];
                return info.save();
            }
        });
    },

    u_get_family: function (username) {
        // console.log(JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id family");
    },

    // hop dong lao dong
    u_post_contract: function (data) {
        // console.log(JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                console.log("data['contract'] " + JSON.stringify(data['contract']));
                info.contract = data['contract'];
                return info.save();
            }
        });
    },
    // hop dong lao dong
    u_get_contract: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id contract");
    },

    // trinh do ngoai ngu
    u_post_foreignlanguage: function (data) {
        console.log("u_post_foreignlanguage " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.foreign_language = data['foreign_language'];
                return info.save();
            }
        });
    },
    u_get_foreignlanguage: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id foreign_language");
    },

    u_post_politic: function (data) {
        // console.log("u_post_politic " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.politic = data['politic'];
                return info.save();
            }
        });
    },
    u_get_politic: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id politic");
    },//

    //tin hoc
    u_post_infotechnology: function (data) {
        console.log("u_post_infotechnology " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.info_technology = data['info_technology'];
                return info.save();
            }
        });
    },
    u_get_infotechnology: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id info_technology");
    },

    u_post_bonus: function (data) {
        console.log("u_post_bonus " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.bonus = data['bonus'];
                return info.save();
            }
        });
    },

    u_get_bonus: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id bonus");
    },

    u_post_discipline: function (data) {
        console.log("u_post_discipline " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.discipline = data['discipline'];
                return info.save();
            }
        });
    },
    u_get_discipline: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id discipline");
    },

    u_post_academicrank: function (data) {
        console.log("u_post_academic_rank " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.academic_rank = data['academic_rank'];
                return info.save();
            }
        });
    },
    u_get_academicrank: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id academic_rank");
    },

    u_post_teachertitle: function (data) {
        console.log("u_post_teacher_title " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.teacher_title = data['teacher_title'];
                return info.save();
            }
        });
    },
    u_get_teachertitle: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id teacher_title");
    },

    //qua trinh gian day
    u_post_processteaching: function (data) {
        console.log("u_post_process_teaching " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.process_teaching = data['process_teaching'];
                return info.save();
            }
        });
    },
    u_get_processteaching: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id process_teaching");
    }
};
