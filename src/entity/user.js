const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "user",
  tableName: "user",
  columns: {
    id: {
      type: "int",
      generated: true,
      primary: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    token:{
      type: "varchar",
      nullable: true,
    },
    role: {
      type: "enum",
      enum: ["user", "admin"],
      default: "user",
    },
  },
});
