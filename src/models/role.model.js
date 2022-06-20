module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      accessLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  Role.associate = function (models) {
    // associations can be defined here
    Role.belongsTo(models.User);
  };

  // `sequelize.define` also returns the model
  return Role;
};
