module.exports = function(sequelize, DataTypes) {
  var DishTag = sequelize.define('DishTag',
    {
      name:         {type: DataTypes.STRING(30), allowNull: false}
    },
    {
      associate: function(models) {
        DishTag.belongsTo(models.Tag, {foreignKeyConstraint: true});
        DishTag.belongsTo(models.Dish, {foreignKeyConstraint: true});
    }
  });

  return DishTag;
};
