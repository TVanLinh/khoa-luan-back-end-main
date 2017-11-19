// import { error } from 'util';

const Nation = require('../model/nation');
const CatalogRank = require("../model/rankCatalog");

module.exports = {
    get_index: function () {
        console.log("catalogRank request");
        let a = [
            {
              "name": "A3",
              "group": {
                  "name": "Nhóm 1",
                  "listRank":[
                      "Chuyên viên cao cấp","Thanh tra viên cao cấp",
                      "Kiểm soát viên cao cấp thuế",
                      "Kiểm toán viên cao cấp",
                      "Kiểm soát viên cao cấp ngân hàng",
                      "Kiểm tra viên cao cấp hải quan",
                      "Thẩm kế viên cao cấp",
                      "Kiểm soát viên cao cấp thị trường",
                      "Thống kê viên cao cấp",
                      "Kiểm soát viên cao cấp chất lượng sản phẩm, hàng hóa",
                      "Chấp hành viên cao cấp (thi hành án dân sự)",
                      "Thẩm tra viên cao cấp (thi hành án dân sự)",
                      "Kiểm tra viên cao cấp thuế"
                    ],
                  "level": [
                    {
                          "name": "1",
                          "salary": "6.2"
                    },
                      {
                          "name": "2",
                          "salary": "6.56"
                      },
                      {
                          "name": "3",
                          "salary": "6.92"
                      },
                       {
                          "name": "4",
                          "salary": "7.28"
                      },
                       {
                          "name": "5",
                          "salary": "7.64"
                      },
                       {
                          "name": "6",
                          "salary": "8.0"
                      }]
              }
            },
            {
              "name": "A3",
              "group": {
                "name": "Nhóm 2",
                "listRank": [
                  "Kế toán viên cao cấp",
                  "Kiểm dịch viên cao cấp động - thực vật"
                ],
                "level": [
                  {
                    "name": "1",
                    "salary": "5.75"
                  },
                  {
                    "name": "2",
                    "salary": "6.11"
                  },
                  {
                    "name": "3",
                    "salary": "6.47"
                  },
                  {
                    "name": "4",
                    "salary": "6.83"
                  },
                  {
                    "name": "5",
                    "salary": "7.19"
                  },
                  {
                    "name": "6",
                    "salary": "7.55"
                  }
                ]
              }
            },
           {
             "name": "A2",
             "group": {
               "name": "Nhóm 1",
               "listRank": [
                 "Kế toán viên cao cấp",
                 "Chấp hành viên tỉnh, thành phố trực thuộc Trung ương","Thanh tra viên chính",
                 "Kiểm soát viên chính thuế",
                 "Kiểm toán viên chính",
                 "Kiểm soát viên chính ngân hàng",
                 "Kiểm tra viên chính hải quan",
                 "Thẩm kế viên chính",
                 "Kiểm soát viên chính thị trường",
                 "Thống kê viên chính",
                 "Kiểm soát viên chính chất lượng sản phẩm, hàng hóa",
                 "Chấp hành viên trung cấp (thi hành án dân sự)",
                 "Thẩm tra viên chính (thi hành án dân sự)",
                 "Kiểm tra viên chính thuế",
                 "Kiểm lâm viên chính"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "4.4"
                 },
                 {
                   "name": "2",
                   "salary": "4.74"
                 },
                 {
                   "name": "3",
                   "salary": "5.08"
                 },
                 {
                   "name": "4",
                   "salary": "5.42"
                 },
                 {
                   "name": "5",
                   "salary": "5.76"
                 },
                 {
                   "name": "6",
                   "salary": "6.18"
                 },
                 {
                   "name": "7",
                   "salary": "6.44"
                 },
                 {
                   "name": "8",
                   "salary": "6.78"
                 }
               ]
             }
           },
           {
             "name": "A2",
             "group": {
               "name": "Nhóm 2",
               "listRank": [
                 "Kế toán viên chính",
                 "Kiểm dịch viên chính động - thực vật",
                 "Kiểm soát viên chính đê điều"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "4.00"
                 },
                 {
                   "name": "2",
                   "salary": "4.34"
                 },
                 {
                   "name": "3",
                   "salary": "4.68"
                 },
                 {
                   "name": "4",
                   "salary": "5.02"
                 },
                 {
                   "name": "5",
                   "salary": "5.36"
                 },
                 {
                   "name": "6",
                   "salary": "5.70"
                 },
                 {
                   "name": "7",
                   "salary": "6.04"
                 },
                 {
                   "name": "8",
                   "salary": "6.38"
                 }
               ]
             }
           },
           {
             "name": "A1",
             "group": {
               "name": "Nhóm 1",
               "listRank": [
                 "Chuyên viên",
                 "Chấp hành viên quận, huyện, thị xã, thành phố thuộc tỉnh",
                 "Công chứng viên",
                 "Thanh tra viên",
                 "Kế toán viên",
                 "Kiểm soát viên thuế",
                 "Kiểm toán viên","Kiểm soát viên ngân hàng",
                 "Kiểm tra viên hải quan","Kiểm dịch viên động - thực vật","Kiểm lâm viên","Kiểm soát viên đê điều (*)",
                 "Thẩm kế viên","Kiểm soát viên thị trường","Thống kê viên","Kiểm soát viên chất lượng sản phẩm, hàng hóa","Kỹ thuật viên bảo quản","Chấp hành viên sơ cấp (thi hành án dân sự)","Thẩm tra viên (thi hành án dân sự)","Thư ký thi hành án (dân sự)",
                 "Kiểm tra viên thuế"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "2,34"
                 },
                 {
                   "name": "2",
                   "salary": "2.67"
                 },
                 {
                   "name": "3",
                   "salary": "3.0"
                 },
                 {
                   "name": "4",
                   "salary": "3.33"
                 },
                 {
                   "name": "5",
                   "salary": "3.66"
                 },
                 {
                   "name": "6",
                   "salary": "3.99"
                 },
                 {
                   "name": "7",
                   "salary": "4.32"
                 },
                 {
                   "name": "8",
                   "salary": "4.65"
                 },
                 {
                   "name": "9",
                   "salary": "4.98"
                 }
               ]
             }
           },
           {
             "name": "A0",
             "group": {
               "name": "Nhóm 1",
               "listRank": [
               "Kế toán viên chính",
                 "Kiểm dịch viên chính động - thực vật",
                 "Kiểm soát viên chính đê điều"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "2.1"
                 },
                 {
                   "name": "2",
                   "salary": "2.41"
                 },
                 {
                   "name": "3",
                   "salary": "2.72"
                 },
                 {
                   "name": "4",
                   "salary": "3.03"
                 },
                 {
                   "name": "5",
                   "salary": "3.34"
                 },
                 {
                   "name": "6",
                   "salary": "3.65"
                 },
                 {
                   "name": "7",
                   "salary": "3.96"
                 },
                 {
                   "name": "8",
                   "salary": "4.27"
                 },
                 {
                   "name": "9",
                   "salary": "4.58"
                 },
                 {
                   "name": "10",
                   "salary": "4.89"
                 }
               ]
             }
           },
           {
             "name": "B",
             "group": {
               "name": "Nhóm 1",
               "listRank": [
                 "Cán sự",
                 "Kế toán viên trung cấp",
                 "Kiểm thu viên thuế",
                 "Thủ kho tiền, vàng bạc, đá quý (ngân hàng) (*)",
                 "Kiểm tra viên trung cấp hải quan",
                 "Kỹ thuật viên kiểm dịch động - thực vật",
                 "Kiểm lâm viên trung cấp","Kiểm soát viên trung cấp đê điều (*)","Kỹ thuật viên kiểm nghiệm bảo quản","Thống kê viên trung cấp","Kiểm soát viên trung cấp chất lượng sản phẩm, hàng hóa","Thư ký trung cấp thi hành án (dân sự)","Kiểm tra viên trung cấp thuế","Kỹ thuật viên bảo quản trung cấp","Thư ký thi hành án (dân sự)",
                 "Thủ kho bảo quản"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "1.86"
                 },
                 {
                   "name": "2",
                   "salary": "2.06"
                 },
                 {
                   "name": "3",
                   "salary": "2.26"
                 },
                 {
                   "name": "4",
                   "salary": "2.46"
                 },
                 {
                   "name": "5",
                   "salary": "2.86"
                 },
                 {
                   "name": "6",
                   "salary": "3.06"
                 },
                 {
                   "name": "7",
                   "salary": "3.26"
                 },
                 {
                   "name": "8",
                   "salary": "3.46"
                 },
                 {
                   "name": "9",
                   "salary": "3.66"
                 },
                 {
                   "name": "10",
                   "salary": "3.86"
                 },
                 {
                   "name": "10",
                   "salary": "4.06"
                 }
               ]
             }
           },
           {
             "name": "C",
             "group": {
               "name": "Nhóm 1",
               "listRank": [
                 "Thủ quỹ kho bạc, ngân hàng",
                 "Kiểm ngân viên",
                 "Nhân viên hải quan",
                 "Kiểm lâm viên sơ cấp",
                 "Thủ kho bảo quản nhóm I",
                 "Thủ kho bảo quản nhóm II",
                 "Bảo vệ, tuần tra canh gác",
                 "Nhân viên bảo vệ kho dự trữ"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "1.65"
                 },
                 {
                   "name": "2",
                   "salary": "1.83"
                 },
                 {
                   "name": "3",
                   "salary": "2.01"
                 },
                 {
                   "name": "4",
                   "salary": "2.19"
                 },
                 {
                   "name": "5",
                   "salary": "2.37"
                 },
                 {
                   "name": "6",
                   "salary": "2.55"
                 },
                 {
                   "name": "7",
                   "salary": "2.73"
                 },
                 {
                   "name": "8",
                   "salary": "2.91"
                 },
                 {
                   "name": "9",
                   "salary": "3.09"
                 },
                 {
                   "name": "10",
                   "salary": "3.27"
                 },
                 {
                   "name": "10",
                   "salary": "3.45"
                 },
                 {
                   "name": "10",
                   "salary": "3.63"
                 }
               ]
             }
           },
           {
             "name": "C",
             "group": {
               "name": "Nhóm 2",
               "listRank": [
                  "Thủ quỹ cơ quan, đơn vị",
                  "Nhân viên thuế"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "1.50"
                 },
                 {
                   "name": "2",
                   "salary": "1.68"
                 },
                 {
                   "name": "3",
                   "salary": "1.86"
                 },
                 {
                   "name": "4",
                   "salary": "2.04"
                 },
                 {
                   "name": "5",
                   "salary": "2.22"
                 },
                 {
                   "name": "6",
                   "salary": "2.40"
                 },
                 {
                   "name": "7",
                   "salary": "2.58"
                 },
                 {
                   "name": "8",
                   "salary": "2.76"
                 },
                 {
                   "name": "9",
                   "salary": "2.94"
                 },
                 {
                   "name": "10",
                   "salary": "3.12"
                 },
                 {
                   "name": "10",
                   "salary": "3.30"
                 },
                 {
                   "name": "10",
                   "salary": "3.48"
                 }
               ]
             }
           },
           {
             "name": "C",
             "group": {
               "name": "Nhóm 3",
               "listRank": [
                 "Ngạch kế toán viên sơ cấp"
               ],
               "level": [
                 {
                   "name": "1",
                   "salary": "1.35"
                 },
                 {
                   "name": "2",
                   "salary": "1.53"
                 },
                 {
                   "name": "3",
                   "salary": "1.71"
                 },
                 {
                   "name": "4",
                   "salary": "1.89"
                 },
                 {
                   "name": "5",
                   "salary": "2.07"
                 },
                 {
                   "name": "6",
                   "salary": "2.25"
                 },
                 {
                   "name": "7",
                   "salary": "2.43"
                 },
                 {
                   "name": "8",
                   "salary": "2.61"
                 },
                 {
                   "name": "9",
                   "salary": "2.79"
                 },
                 {
                   "name": "10",
                   "salary": "2.97"
                 },
                 {
                   "name": "10",
                   "salary": "3.15"
                 },
                 {
                   "name": "10",
                   "salary": "3.33"
                 }
               ]
             }
           }
          ];
          
        //  CatalogRank.insertMany(a,function(err){

        // });
        return CatalogRank.find();
    }

};
