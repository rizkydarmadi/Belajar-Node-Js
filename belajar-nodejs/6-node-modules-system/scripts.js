// const lama = (nama) => {
//   setTimeout(() => {
//     console.log(nama);
//   }, 2000);
// };

// const cetakNama = (cetak) => `hi nama saya ${cetak}`;

// lama('dipa');

// console.log(cetakNama('taylor swift'));
// lama('aaron');
const scripts = require('./index'); //import local modules

console.log(scripts.Cetaknama('taylor alison'), scripts.PI, scripts.mahasiswa.cetakMhs(), new scripts.Orang());
