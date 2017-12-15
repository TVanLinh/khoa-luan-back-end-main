const Info = require('../model/info');
module.exports = {

    get_index: function () {
        // Info.remove({}, function () {
        //
        // });
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
    get_avartar: function (username) {
        return Info.findOne({staffCode: username}, "-_id cv.avatarUrl");
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
    put_cvaccept: function (username) {
        console.log("access ok" + username);
        Info.findOne({staffCode: username}).then(cv => {
            if (cv) {
                cv.accept = true;
                cv.save();
                console.log("access ok");
            }
        });
    },

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
    },

    //danh hieu thi dua
    u_post_emulationtitle: function (data) {
        console.log("u_post_emulation_title " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.emulation_title = data['emulation_title'];
                return info.save();
            }
        });
    },
    u_get_emulationtitle: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id emulation_title");
    },

    //thong tin di nuoc ngoai
    u_post_processforeign: function (data) {
        console.log("u_post_process_foreign " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.process_foreign = data['process_foreign'];
                return info.save();
            }
        });
    },
    u_get_processforeign: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id process_foreign");
    },

    //luanvan luan an
    u_post_thesisguide: function (data) {
        console.log("u_post_thesis_guide " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.thesis_guide = data['thesis_guide'];
                return info.save();
            }
        });
    },
    //luan
    u_get_thesisguide: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id thesis_guide");
    },

    //de tai khoa hoc
    u_post_scienetopic: function (data) {
        console.log("u_post_sciene_topic " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.sciene_topic = data['sciene_topic'];
                return info.save();
            }
        });
    },
    //luan
    u_get_scienetopic: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id sciene_topic");
    },

    //bai bao
    u_post_newspaper: function (data) {
        console.log("u_post_newspaper " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.newspaper = data['newspaper'];
                return info.save();
            }
        });
    },
    //luan
    u_get_newspaper: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id newspaper");
    },

    //seminar
    u_post_seminar: function (data) {
        console.log("u_post_seminar " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.seminar = data['seminar'];
                return info.save();
            }
        });
    },
    //luan
    u_get_seminar: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id seminar");
    },

    //qua trinh dao tao
    u_post_train: function (data) {
        console.log("u_post_train " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.train = data['train'];
                return info.save();
            }
        });
    }
    ,
    u_get_train: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id train");
    },

    //qua trinh phat minh sang che
    u_post_processevent: function (data) {
        console.log("u_post_process_event " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.process_event = data['process_event'];
                return info.save();
            }
        });
    }
    ,
    u_get_processevent: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id process_event");
    },

    //qua trinh phat minh sang che
    u_post_processpublish: function (data) {
        console.log("u_post_process_publish " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.process_publish = data['process_publish'];
                return info.save();
            }
        });
    }
    ,
    u_get_processpublish: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id process_publish");
    },

    //qua trinh phat cong tac
    u_post_processwork: function (data) {
        console.log("u_post_process_work " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.process_work = data['process_work'];
                return info.save();
            }
        });
    }
    ,
    u_get_processwork: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id process_work");
    },


    //qua trinh luong
    u_post_salary: function (data) {
        console.log("u_post_salary " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                info.salary = data['salary'];
                return info.save();
            }
        });
    }
    ,
    u_put_salary: function (data) {
        console.log("u_post_salary " + JSON.stringify(data));
        return Info.findOne({staffCode: data["staffCode"]}, function (err, info) {
            if (info === null) {
                return Info(data).save();
            } else {
                if (info.salary) {
                } else {
                    info.salary = [];
                }
                info.salary.push(data['salary']);
                return info.save();
            }
        });
    }
    ,
    get_salary: function (username) {
        // console.log("get_contract " + JSON.stringify(username));
        return Info.findOne({staffCode: username}, "-_id salary");
    }
};
