var mongoose = require('mongoose');

//create Schema
var infoShema = new mongoose.Schema({
    accept: {type: Boolean, default: true},
    staffCode: String,
    cv: {
        fullName: String,
        nameOther: String,
        avatarUrl: String,
        sex: String,
        email: String,
        phone: String,
        birthDay: Date,
        placeBirth: {
            city: String,
            district: String,
            guild: String
        },
        homeTown: {
            city: String,
            district: String,
            guild: String
        },
        placeNow: {
            city: String,
            district: String,
            guild: String,
            street: String,
            numberHome: String
        },
        hashNation: Boolean,
        nation: String,
        identity: {identityNumber: String, dateRange: Date, placeRange: String},
        placeRegisterHouseHold: String,//noi dang ki ho khau thuong tru
        policyObject: String,
        bloodGroup: String
    },

    armyPUG: {
        army: {//quan ngu
            dateIn: Date,//ngay nhap ngu
            dateOut: Date,//ngay xuat ngu
            rankTallest: String,// quan ham cao nhat
            rankVeterans: String, // Hang thuong binh
            bookInjured: String,//so thuong tat
            formInjured: String
        },
        party: {//dang
            dateIn: Date,//ngay vao
            dateInOfical: Date, //ngay vao chinh thuc
            placeIn: String,//noi ket nap
            process: [{
                dateFrom: Date,
                place: String,
                position: String,
                now: Boolean
            }]
        },//doan
        union: {
            dateIn: Date,
            placeIn: String,
            process: [{
                dateFrom: Date,
                place: String,
                position: String,
                now: Boolean
            }]
        },////cong doan
        group: {
            dateIn: Date,
            process: [{
                dateFrom: Date,
                place: String,
                position: String,
                now: Boolean
            }]
        }

    },
    //gia dinh
    family: [{
        relation: String,
        name: String,
        yearBirth: Number,
        job: String
    }],
    //hop dong lao dong
    contract: [{
        numberContact: String,
        specie: Number,
        dateEffect: Date,
        dateEndEffect: Date,
        unitOrgan: String,
        job: String
    }],
    foreign_language: [{
        name: String,
        listen: Number,
        read: Number,
        speak: Number,
        write: Number,
        translate: Number,
        communicate: Number,
        branch: String
    }],
    politic: [
        {
            level: String,
            yearLicense: Number,
            now: Boolean
        }
    ],
    info_technology: [{
        level: String,
        yearLicense: Number
    }],
    //thong tin khen thuong
    bonus: [
        {
            rankDecide: String,
            form: String,
            numberDecide: String,
            dateDecide: Date,
            reason: String
        }
    ],
    //thong tin ky luat
    discipline: [
        {
            rankDecide: String,
            form: String,
            numberDecide: String,
            dateDecide: Date,
            reason: String
        }
    ],
    //thong tin hoc ham
    academic_rank: [{
        rank: String,
        placeReceive: String,
        yearReceive: Number
    }],
    teacher_title: [
        {
            title: String,
            yearReceive: Number
        }
    ],
    //qua trinh giang day
    process_teaching: [{
        nameSubjects: String,
        levelEducation: String,
        credit: Number,
        organTeaching: String,
        yearTeaching: Number,
        languageTeaching: String
    }],
    //danh hieu thi dua
    emulation_title: [{
        title: String,
        dateLicense: Date,
        numberDecide: String
    }],
    process_foreign: [
        {
            dateFrom: Date,
            dateEnd: Date,
            national: String,
            product: String,
            purpose: String
        }
    ],
    //huong dan luan van luan an
    thesis_guide: [
        {
            namePersonGuide: String,
            level: String,
            role: String,
            thesisName: String,
            yearGuide: Number,
            speciesObtain: String
        }
    ],
    //de tai khoa hoc
    sciene_topic: [{
        name: String,
        code: String,
        dateBegin: Date,
        monthWork: Number,
        role: String,
        level: String,
        specieObtain: String
    }],
    //bai bao
    newspaper: [{
        name: String,
        nameMagazine: String,
        numberMagazine: String,
        pagePost: Number,
        year: Number,
        numberAuthor: Number,
        authors: String,
        location: String
    }],
    seminar: [{
        name: String,
        nameConvention: String,
        pagePost: Number,
        year: Number,
        numberAuthor: Number,
        authors: String,
        location: String
    }],
    train: {
        general: Number,
        longTime: [{
            yearFrom: Number,
            yearEnd: Number,
            specialized: String,//chuyen nghanh
            levelLearn: String,//bac hoc
            academicRank: String,//hoc vi
            spice: String,//xep loai
            school: String,
            national: String
        }],
        shortTime: [{
            dateFrom: Date,
            numberMonth: Number,
            certificate: String,
            placeTrain: String,
            national: String,
            description: String
        }]
    },
    process_event: [{
        name: String,
        organLicense: String,
        dateOfIssue: Date,
        numberAuthor: Number,
        description: String
    }],
    process_publish: [{
        name: String,
        year: Number,
        publishCompany: String,
        role: String
    }
    ],
    process_work: [{
        level1: String,
        level2: String,
        now: Boolean,
        dateFrom: Date,
        dateEnd: Date,
        position: String,
        job: String
    }],
    salary: [{
        dateFrom: Date,
        dateEnd: Date,
        specie: String,
        group: String,
        rank: String,
        level: String,
        factorSalary: Number,
        numberDecide: String,
        contentDecide: String
    }]
});


//create model
module.exports = mongoose.model('Info', infoShema);
