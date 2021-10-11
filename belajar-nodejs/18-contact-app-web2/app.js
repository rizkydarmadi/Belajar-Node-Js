const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

//? menngunakan ejs
app.set('view engine', 'ejs');

//?third-party-middleware
app.use(expressLayouts);

//? built in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//? konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//? konfigurasi flash

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'ramsdhale',
      email: 'ramsdhale@gooners.com',
    },
    {
      nama: 'ederson',
      email: 'ederson@ghoib.com',
    },
    {
      nama: 'mendy',
      email: 'mendy@lir.com',
    },
  ];

  res.render('index', {
    nama: 'anthony taylor',
    layout: 'layouts/main-layout',
    title: 'halaman home',
    mahasiswa, //! [mahasiswa : mahasiswa] karena key dan valuenya sama maka tulis valuenya saja
  }); //? {key:'values'} -- exports to views directory
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'layouts/main-layout', title: 'halaman about' });
});

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', { layout: 'layouts/main-layout', title: 'halaman contact', contacts, msg: req.flash('msg') });
});

//?halaman form tambah data contact

app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Contact',
    layout: 'layouts/main-layout',
  });
});

//? proses tambah data contact

app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('Nama contact sudah digunakan');
      }
      return true;
    }),
    check('email', 'email tidak valid').isEmail(),
    check('nohp', 'No Hp Tidak Valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash('msg', 'Data contact berhasil ditambahkan'); //? kirimkan flash mesaage
      res.redirect('/contact');
    }
  }
);

//?halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', { layout: 'layouts/main-layout', title: 'halaman detail contact', contact });
});

app.use('/product/:id', (req, res) => {
  res.send(`product ID:  ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
