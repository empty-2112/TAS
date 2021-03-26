var format = require('biguint-format');
//Khai báo buffer
const buf = Buffer.allocUnsafe(8);
//Convert Double to Buffer
buf.writeDoubleBE(1000, 0);
console.log(buf);
//Conver Buffer to Binary
var bin = format(buf, 'bin', { groupsize: 8 });
var hex1 = bin.toString().split(" ")[0] + bin.toString().split(" ")[1];
//COnvert Buffer to Hexa
console.log(format(buf, 'hex'));