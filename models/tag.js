module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag',
    {
      name:         {type: DataTypes.STRING(30), allowNull: false},
    },
    {
      associate: function(models) {
        Tag.hasMany(models.DishTag, {foreignKeyConstraint: true, onDelete: 'CASCADE'});
    }
  });

  return Tag;
};
