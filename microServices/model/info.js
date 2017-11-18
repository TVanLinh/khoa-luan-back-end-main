var mongoose = require('mongoose');

//create Schema
var infoShema = new mongoose.Schema({
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
    }]
});


//create model
module.exports = mongoose.model('Info', infoShema);
