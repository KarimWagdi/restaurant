const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "addons",
  tableName: "addons",
  columns: {
    id: {
      type: "int",
      generated: true,
      primary: true,
    },
    name: {
      type: "varchar",
    },
    price: {
      type: "decimal",
    },
    state: {
      type: "enum",
      enum: ["active", "holding"],
      default: "active",
    },
  },
});
