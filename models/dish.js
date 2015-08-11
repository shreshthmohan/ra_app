module.exports = function(sequelize, DataTypes) {
  var Dish = sequelize.define('Dish',
    {
      name:         {type: DataTypes.STRING(30), allowNull: false},
      description:  {type: DataTypes.TEXT},
      price:        {type: DataTypes.STRING(30), allowNull: false},
      image_url:    {type: DataTypes.STRING(600)},
      vegetarian:   {type: DataTypes.BOOLEAN}
    },
    {
      associate: function(models) {
        Dish.hasMany(models.DishCategory, {foreignKeyConstraint: true, onDelete: 'CASCADE'});
        Dish.hasMany(models.DishTag, {foreignKeyConstraint: true, onDelete: 'CASCADE'});
        Dish.belongsTo(models.Restaurant, {foreignKeyConstraint: true});
      }
  });

  return Dish;
};
