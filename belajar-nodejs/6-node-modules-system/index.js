const Cetaknama = (nama) => `halo nama saya ${nama}`;

const PI = 3.41;

const mahasiswa = {
  nama: 'rebbeca',
  umur: 20,
  cetakMhs() {
    return `halo, nama saya ${this.nama} dan saya ${this.umur} tahum`;
  },
};

class Orang {
  constructor() {
    console.log(`object orang telah dibuat`);
  }
}

// module.exports.Cetaknama = Cetaknama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiwa;
// module.exports.Orang = Orang;

// module.exports = {
//   Cetaknama: Cetaknama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// };
module.exports = { Cetaknama, PI, mahasiswa, Orang };
