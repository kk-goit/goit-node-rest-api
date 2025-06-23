import db_conn from "./connection.js";
import { DataTypes } from "sequelize";

const Contact = db_conn.define("contacts", {
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Contact.sync();

export default Contact;