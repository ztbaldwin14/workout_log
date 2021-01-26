module.exports = (sequelize, DataTypes) => {
    const Workout = sequelize.define('log', {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      definition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
      },
    });
    return Workout;
  };
  