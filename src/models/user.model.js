const { hashPassword } = require("../utils");

async function hashUserPassword(user) {
  if (!user.changed("password")) {
    return null;
  }

  // hash the password
  const hash = await hashPassword(user.password);
  user.setDataValue("password", hash);

  return null;
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      provider: { type: DataTypes.STRING },
      socialId: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
    },
    {
      // Other model options go here
      hooks: {
        beforeSave: hashUserPassword,
      },
    }
  );

  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.Role);
  };

  // `sequelize.define` also returns the model
  return User;
};
