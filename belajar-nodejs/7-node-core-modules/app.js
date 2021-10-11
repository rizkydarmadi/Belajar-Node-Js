const { command } = require('yargs');
const yargs = require('yargs');
const contacts = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Menambahkan Contact baru',
    builder: {
      nama: {
        describe: 'nama lengkap',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      noHp: {
        describe: 'No Handphone',
        demandOption: 'true',
        type: 'string',
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();
//?menampilakn list contact

yargs.command({
  command: 'list',
  describe: 'Menampilakan semua nama & no Hp contact',
  handler() {
    contacts.listContact();
  },
});

//? menapmpilkan detail sebuah kontak

yargs.command({
  command: 'detail',
  describe: 'Menampilakan detail sebuah nama',
  builder: {
    nama: {
      describe: 'nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});
//?menghapus contact berdasrkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus sebuah nama',
  builder: {
    nama: {
      describe: 'nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question('masukan email anda: ', (email) => {
//       resolve(email);
//     });
//   });
// };

// const { tulisPertanyaan, simpanContact } = require('./contacts');

// const main = async () => {
//   const nama = await tulisPertanyaan('masukan nama anda: ');
//   const email = await tulisPertanyaan('masukan nama email anda: ');
//   const noHp = await tulisPertanyaan('masukan no Hp anda: ');

//   simpanContact(nama, email, noHp);
// };

// main();

// rl.question(`masukan nama kalian: `, (nama) => {
//   rl.question(`input your number phone: `, (noHp) => {
//     const contact = { nama, noHp };
//     const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
//     const contacts = JSON.parse(fileBuffer);

//     contacts.push(contact);

//     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//     console.log(`terima kasih telah memasukan data`);

//     rl.close();
//   });
// });
