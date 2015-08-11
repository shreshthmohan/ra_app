module.exports = function(sequelize, DataTypes) {
  var DishCategory = sequelize.define('DishCategory',
    {
      name:         {type: DataTypes.STRING(30)}
    },
    {
      associate: function(models) {
        DishCategory.belongsTo(models.Category, {foreignKeyConstraint: true});
        DishCategory.belongsTo(models.Dish, {foreignKeyConstraint: true});
    }
  });

  return DishCategory;
};
