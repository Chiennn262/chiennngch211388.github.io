var express = require('express');
var router = express.Router();
const ToyModel = require('../models/ToyModel');
const CategoryModel = require('../models/CategoryModel');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('user/homepage', { toys: toys });
});



/*
  Route for admin
*/
router.get('/admin/homepage', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('admin/homepage', { toys: toys });
});


// Manage toys
router.get('/admin/manage_toys', async (req, res) => {
  var toys = await ToyModel.find({});
  res.render('admin/manage_toys', { toys: toys });
});

router.get('/admin/add_toy', async (req, res) => {
  var categories = await CategoryModel.find({});
  res.render('admin/add_toy', { categories: categories });
});

router.post('/add_toy', async (req, res) => {
  var toy = req.body;
  await ToyModel.create(toy)
    .then(() => console.log('Add new toy succeed!'));
  res.redirect('admin/manage_toys');
});

router.get('/edit_toy/:id', async (req, res) => {
  var toy = await ToyModel.findById(req.params.id);
  var categories = await CategoryModel.find({});
  res.render('admin/edit_toy', { toy: toy, categories: categories });
});

router.post('/update_toy/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await ToyModel.findByIdAndUpdate(id, updatedData)
    .then(() => { console.log('Update toy information succeed !') })
    .catch(() => { console.log('Update toy information failed !') })
  res.redirect('/admin/manage_toys');
})

router.get('/delete_toy/:id', async (req, res) => {
  var id = req.params.id;
  await ToyModel.findByIdAndDelete(id)
    .then(() => { console.log('Delete toy succeed!') })
    .catch((err) => { console.log('Delete toy failed!') });
  var toys = await ToyModel.find({});
  res.render('admin/manage_toys', { toys: toys });
});


// Manage categories
router.get('/admin/manage_categories', async (req, res) => {
  var categories = await CategoryModel.find({});
  res.render('admin/manage_categories', { categories: categories });
});

router.get('/admin/add_category', async (req, res) => {
  res.render('admin/add_category');
});

router.post('/add_category', async (req, res) => {
  var category = req.body;
  await CategoryModel.create(category)
    .then(() => console.log('Add new category succeed!'));
  res.redirect('admin/manage_categories');
});

router.get('/edit_category/:id', async (req, res) => {
  var category = await CategoryModel.findById(req.params.id);
  res.render('admin/edit_category', { category: category });
});

router.post('/update_category/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData = req.body;
  await CategoryModel.findByIdAndUpdate(id, updatedData)
    .then(() => { console.log('Update category information succeed !') })
    .catch(() => { console.log('Update category information failed !') })
  res.redirect('/admin/manage_categories');
})

router.get('/delete_category/:id', async (req, res) => {
  var id = req.params.id;
  await CategoryModel.findByIdAndDelete(id)
    .then(() => { console.log('Delete category succeed!') })
    .catch((err) => { console.log('Delete category failed!') });
  var categories = await CategoryModel.find({});
  res.render('admin/manage_categories', { categories: categories });
});



/*
  Route for user
*/
router.get('/user/homepage', async (req, res) => {
  res.render('user/homepage');
});

router.get('/user/toy_list', async (req, res) => {
  var toys = await ToyModel.find({});
  var categories = await CategoryModel.find({});
  res.render('user/toy_list', { toys: toys, categories: categories });
});


module.exports = router;
