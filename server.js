var express = require('express');
var app = express();
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
var hbs = require('express-handlebars');
var bodyParser = require("body-parser");
var session = require('express-session')
const mongoose =require('mongoose');
const uri = "mongodb+srv://dbEnzrald:Khoa19082003@mydatabase.v2hogoh.mongodb.net/test";
app.use(bodyParser.urlencoded({ extended: false }));
 mongoose.connect(uri).then(console.log('Kết nối thành công'));
app.use(session({
    secret: 'khoanxph27009',
    resave: false,
    saveUninitialized: true
}));

app.engine('.hbs', hbs.engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');
app.set('views', './views');
const sanphamModal=require('./SanPhamModel')

app.get('/', async (req, res) => {
    const data = await sanphamModal.find().lean()
    res.render('home', { data })
  })
  app.get('/add', function(req, res){
    res.render('add')
})
  // ADD
  app.post('/add', async (req, res) => {
    const {  ten, gia,soluong, loaiSP, khuyenmai } = req.body
    const newDoc = new sanphamModal({  ten, gia,soluong,loaiSP,khuyenmai })
    await newDoc.save()
    res.redirect('/')
  })
  
  // EDIT
  app.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    sanphamModal.findByIdAndUpdate(id, newData)
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
      });

  })
  app.get('/edit/:id', async(req, res)=>{
    const id = req.params.id;
    sanphamModal.findById(id)
      .then(data => {
        res.render('edit', { data });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
      });
  })
  // DELETE
  app.post('/delete/:id', async (req, res) => {
    const id = req.params.id
    await sanphamModal.findByIdAndDelete(id)
    res.redirect('/')
  })
  
  app.listen(8080, () => console.log('Server is running on port 8080...'))

  