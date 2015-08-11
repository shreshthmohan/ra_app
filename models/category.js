module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category',
    {
      name:         {type: DataTypes.STRING(30), allowNull: false}
    },
    {
      associate: function(models) {
        Category.hasMany(models.DishCategory, {foreignKeyConstraint: true, onDelete: 'CASCADE'});
    }
  });

  return Category;
};
