const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "categories",
  tableName: "categories",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
    },
    img: {
      type: "varchar",
    },
  },
  relations: {
    menu_category: {
      target: "menu_category",
      type: "one-to-many",
      inverseSide: "category",
    },
  },
});
