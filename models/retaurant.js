module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define('Restaurant',
    {
      name:         {type: DataTypes.STRING(50), allowNull: false}
    },
    {
      associate: function(models) {
        Restaurant.hasMany(models.Dish, {foreignKeyConstraint: true, onDelete: 'CASCADE'});
    }
  });

  return Restaurant;
};
