var db = require('../models');
var Sequelize = require('sequelize');
var sequelize = db.sequelize; // just to avoid the confusion
var Promise = require('bluebird');


exports.create_form = function(req, res) {
  db.Category.findAll()
  .success(function(categories) {
    res.render('create_dish', {
      _title: 'Create a new dish',
      categories: categories})
  })
}

exports.create = function(req, res) {
  if ((req.param('name') == null) || (req.param('name') == '') || (req.param('price') == null) || (req.param('price') == '')) {}
  else {
    db.Dish.create({
      name:         req.param('name'),
      description:  req.param('description'),
      price:        req.param('price'),
      image_url:    req.param('image_url'),
      vegetarian:   req.param('vegetarian')
    })
    .success(function(dish) {
      console.log(req.param('categories'));
      var cats = req.param('categories');
      for (i = 0; i < cats.length; i++) {
        console.log(cats[i]);
      }
      var promises = [];
      var cat;
      cats.forEach(function(c) {
        promises.push(
          db.Category.find({where: {id: c}})
          .then(function(category) {
            db.DishCategory.create({
              name: ''})
            .success(function(dish_category) {
              dish_category.setDish(dish)
              .success(function() {
                dish_category.setCategory(category)
                .success(function() {
                   return;
                })
              })
            })
          })
        )
      })
      return Promise.all(promises)
    })
    .then(function() {
      res.send('Dish was successfully added to the database and associated with categories')
      // TODO: Proper JSON response: "Success ..."
    })
  }
}

exports.all_by_category = function(req, res) {
  db.Category.findAll({
    include: [
      {
        model: db.DishCategory,
        include: [
          {
            model: db.Dish,
            include: [
              {
                model:db.DishTag,
                include: [db.Tag]
              }
            ]
          }]
      }
    ]
  })
  .success(function(categories) {
    res.send("All categories with included Dishes and respective tags, if any: " + JSON.stringify(categories))
    // TODO: Proper JSON response: "Success ..."
  })
}

exports.by_id = function(req, res) {
  db.Dish.find({
    where: {id: req.param('id')}
  })
  .success(function(dish) {
    if(dish == null) {
      res.send("Invalid id");
    }
    else {
      res.send("Queried dish: " + JSON.stringify(dish))
    }
  })
  .failure(function(err) {
    res.send("Error occurred: " + JSON.stringify(err))
  })
}
