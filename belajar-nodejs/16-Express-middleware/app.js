const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;
const morgan = require('morgan');

//? menngunakan ejs
app.set('view engine', 'ejs');

//?third-party-middleware
app.use(expressLayouts);
app.use(morgan('dev'));

//? built in middleware
app.use(express.static('public'));

//? application level middleware
app.use((req, res, next) => {
  console.log('time: ', Date.now());
  next();
});

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
  res.render('contact', { layout: 'layouts/main-layout', title: 'halaman contact' });
});

app.use('/product/:id', (req, res) => {
  res.send(`product ID:  ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404 page not found </h1>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
