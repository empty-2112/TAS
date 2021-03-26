const Excel = require('exceljs');
var workbook = new Excel.Workbook();

module.exports = function report(para) {
    return new Promise((resolve, reject) => {
        workbook.xlsx.readFile("./form2.xlsx").then(result => {
            var Sheet = workbook.getWorksheet("Sheet1");
            //
            Sheet.getRow(11).getCell(3).value = para.maHD;
            Sheet.getRow(11).getCell(8).value = new Date(para.datecreate).toLocaleDateString();
            Sheet.getRow(14).getCell(3).value = para.tenKH;

            //Ma DON HANG
            if (para.ngan1 == "DO 0.001%" || para.ngan1 == "DO 0.05%") {
                Sheet.getRow(20).getCell(2).value = para.maHD;
                Sheet.getRow(20).getCell(4).value = para.ngan1;
                Sheet.getRow(20).getCell(7).value = para.khoiluong1;
            } else {

            }
            //
            if (para.ngan2 == "DO 0.001%" || para.ngan2 == "DO 0.05%") {
                Sheet.getRow(21).getCell(2).value = para.maHD;
                Sheet.getRow(21).getCell(4).value = para.ngan2;
                Sheet.getRow(21).getCell(7).value = para.khoiluong2;
            } else {

            }
            //
            if (para.ngan3 == "DO 0.001%" || para.ngan3 == "DO 0.05%") {
                Sheet.getRow(22).getCell(2).value = para.maHD;
                Sheet.getRow(22).getCell(4).value = para.ngan3;
                Sheet.getRow(22).getCell(7).value = para.khoiluong3;
            } else {

            }
            //
            if (para.ngan4 == "DO 0.001%" || para.ngan4 == "DO 0.05%") {
                Sheet.getRow(23).getCell(2).value = para.maHD;
                Sheet.getRow(23).getCell(4).value = para.ngan4;
                Sheet.getRow(23).getCell(7).value = para.khoiluong4;
            } else {

            }
            if (para.ngan5 == "DO 0.001%" || para.ngan5 == "DO 0.05%") {
                Sheet.getRow(24).getCell(2).value = para.maHD;
                Sheet.getRow(24).getCell(4).value = para.ngan5;
                Sheet.getRow(24).getCell(7).value = para.khoiluong5;
            } else {

            }
            if (para.ngan6 == "DO 0.001%" || para.ngan6 == "DO 0.05%") {
                Sheet.getRow(25).getCell(2).value = para.maHD;
                Sheet.getRow(25).getCell(4).value = para.ngan6;
                Sheet.getRow(25).getCell(7).value = para.khoiluong6;
            } else {

            }
            if (para.ngan7 == "DO 0.001%" || para.ngan7 == "DO 0.05%") {
                Sheet.getRow(26).getCell(2).value = para.maHD;
                Sheet.getRow(26).getCell(4).value = para.ngan7;
                Sheet.getRow(26).getCell(7).value = para.khoiluong7;
            } else {

            }
            if (para.ngan8 == "DO 0.001%" || para.ngan8 == "DO 0.05%") {
                Sheet.getRow(27).getCell(2).value = para.maHD;
                Sheet.getRow(27).getCell(4).value = para.ngan8;
                Sheet.getRow(27).getCell(7).value = para.khoiluong8;
            } else {

            }
            if (para.ngan9 == "DO 0.001%" || para.ngan9 == "DO 0.05%") {
                Sheet.getRow(28).getCell(2).value = para.maHD;
                Sheet.getRow(28).getCell(4).value = para.ngan9;
                Sheet.getRow(28).getCell(7).value = para.khoiluong9;
            } else {

            }
            //N1

            // Sheet.getRow(20).getCell(8).value = "nhietdo1";
            // Sheet.getRow(20).getCell(9).value = "vcf1";
            // Sheet.getRow(20).getCell(10).value = "1";
            // Sheet.getRow(20).getCell(11).value = "1";
            //N2

            // Sheet.getRow(21).getCell(8).value = "nhietdo2";
            // Sheet.getRow(21).getCell(9).value = "vcf2";
            // Sheet.getRow(21).getCell(10).value = "2";
            // Sheet.getRow(21).getCell(11).value = "2";
            //N3

            // Sheet.getRow(22).getCell(8).value = "nhietdo3";
            // Sheet.getRow(22).getCell(9).value = "vcf3";
            // Sheet.getRow(22).getCell(10).value = "3";
            // Sheet.getRow(22).getCell(11).value = "3";
            //N4

            // Sheet.getRow(23).getCell(8).value = "nhietdo4";
            // Sheet.getRow(23).getCell(9).value = "vcf4";
            // Sheet.getRow(23).getCell(10).value = "4";
            // Sheet.getRow(23).getCell(11).value = "4";
            //N5

            // Sheet.getRow(24).getCell(8).value = "nhietdo5";
            // Sheet.getRow(24).getCell(9).value = "vcf5";
            // Sheet.getRow(24).getCell(10).value = "5";
            // Sheet.getRow(24).getCell(11).value = "5";
            //N6

            // Sheet.getRow(25).getCell(8).value = "nhietdo6";
            // Sheet.getRow(25).getCell(9).value = "vcf6";
            // Sheet.getRow(25).getCell(10).value = "6";
            // Sheet.getRow(25).getCell(11).value = "6";
            //N7

            // Sheet.getRow(26).getCell(8).value = "nhietdo7";
            // Sheet.getRow(26).getCell(9).value = "vcf7";
            // Sheet.getRow(26).getCell(10).value = "7";
            // Sheet.getRow(26).getCell(11).value = "7";
            //N8

            // Sheet.getRow(27).getCell(8).value = "nhietdo8";
            // Sheet.getRow(27).getCell(9).value = "vcf8";
            // Sheet.getRow(27).getCell(10).value = "8";
            // Sheet.getRow(27).getCell(11).value = "8";
            //N9

            //Sheet.getRow(28).getCell(8).value = "nhietdo9";
            //Sheet.getRow(28).getCell(9).value = "vcf9";
            //Sheet.getRow(28).getCell(10).value = "9";
            //Sheet.getRow(28).getCell(11).value = "9";
            //TONG
            //Sheet.getRow(29).getCell(7).value = "SUM(G20:G28)";
            //Sheet.getRow(29).getCell(10).value = "SUM(J20:J28)";
            //Sheet.getRow(29).getCell(11).value = "SUM(K20:K28)";
            //
            Sheet.getRow(31).getCell(3).value = new Date(Date.now()).toLocaleDateString();
            //
            Sheet.getRow(32).getCell(6).value = para.bienso;
            //Sheet.getRow(32).getCell(9).value = "NDTB";
            //Sheet.getRow(32).getCell(11).value = "tytrong";

            Sheet.getRow(33).getCell(4).value = para.tenTX;
            //Sheet.getRow(33).getCell(9).value = "VCF";
            //Sheet.getRow(33).getCell(11).value = "WCF";

            Sheet.getRow(34).getCell(3).value = para.cmnd;
            //Sheet.getRow(34).getCell(9).value = "SL15oC";

            Sheet.getRow(35).getCell(3).value = new Date(para.ngaycap).toLocaleDateString();
            //Sheet.getRow(35).getCell(9).value = "khongluong";
            //SET PRINT AREA
            Sheet.pageSetup.printArea = 'A1:K47';

            //END
            workbook.xlsx.writeFile("Report/PhieuXuatHang.xlsx").then(result => {
                resolve(true);
            }).catch(err => {
                console.log(err);
            })
        });
    })
};