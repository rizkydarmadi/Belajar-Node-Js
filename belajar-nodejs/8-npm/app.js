const validator = require('validator');
const chalk = require('chalk');
// console.log(validator.isEmail('rizkydarmadi69@gmail.com'));
// console.log(validator.isMobilePhone('+6281283359408', 'id-ID'));
// console.log(validator.isNumeric('+6281283359408'));
console.log(chalk.red.underline.bgBlue(validator.isNumeric('+6281283359408')));

// const pesan = 'hello world';
// console.log(chalk.bgGreen.black(pesan));

const nama = 'taylor';
const pesan = chalk`Lorem ipsum dolor, {bgGreen.black black lives matter} consectetur adipisicing elit. {bgRed.italic.white Excepturi, debitis}. {bgBlue.bold.black nama saya ${nama}}`;

console.log(pesan);
