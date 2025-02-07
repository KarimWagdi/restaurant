const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "menu",
  tableName: "menu",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
  },
  relations: {
    branch: {
      target: "branches",
      type: "one-to-one",
      joinColumn: { name: "branch_id", referencedColumnName: "id" },
    },
    menu_category: {
      target: "menu_category",
      type: "one-to-many",
      inverseSide: "menu",
    },
  },
});
