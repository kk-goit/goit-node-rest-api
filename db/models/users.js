import db_conn from "../connection.js";
import { DataTypes } from "sequelize";

const User = db_conn.define("users", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter"
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});


User.sync({ force: false });

export default User;
