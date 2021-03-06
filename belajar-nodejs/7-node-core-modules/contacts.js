const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//? synchronous
// try {
//   fs.writeFileSync('data/text.txt', 'hello im so happy to learn nodejs');
// } catch (error) {
//   console.log(error);
// }

//? asynchronous
// fs.writeFile(`data/text.txt`, 'hello world secara asynchronous', (e) => {
//   console.log(e);
// });

//?synchsronous
// const data = fs.readFileSync(`data/text.txt`, 'utf-8');
// console.log(data);

//?asynchronous
// fs.readFile(`data/text.txt`, `utf8`, (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

//?readline

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

//?membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
//? membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf8');
}

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (nama) => {
//       resolve(nama);
//     });
//   });
// };

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
  // const contacts = JSON.parse(fileBuffer);
  const contacts = loadContact();

  //? cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold('contact sudah terdaftar, gunakan nama lain'));
    return false;
  }
  //? cek email

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold('email tidak valid'));
      return false;
    }
  }

  //? cek no hp
  if (!validator.isMobilePhone(noHp, 'id-ID')) {
    console.log(chalk.red.inverse.bold('no HP tidak valid'));
    return false;
  }

  if (!validator.isEmail(email)) {
    console.log(chalk.red.inverse.bold('email tidak valid'));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`terima kasih telah memasukan data`));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold(`daftar kontak`));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil di hapus`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
