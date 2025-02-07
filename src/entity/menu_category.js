const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "menu_category",
  tableName: "menu_category",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    state: {
      type: "enum",
      enum: ["active", "holding"],
      default: "active",
    },
  },
  relations: {
    menu: {
      target: "menu",
      type: "many-to-one",
      joinColumn: { name: "menu_id", referencedColumnName: "id" },
    },
    category: {
      target: "categories",
      type: "many-to-one",
      joinColumn: { name: "category_id", referencedColumnName: "id" },
    },
  },
});
