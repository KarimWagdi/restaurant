const { EntitySchema } = require("typeorm");
const cuisines = require("./cuisines");

module.exports = new EntitySchema({
  name: "item",
  tableName: "item",
  columns: {
    id: {
      type: "int",
      generated: true,
      primary: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    img: {
      type: "varchar",
    },
    price: {
      type: "decimal",
    },
    state: {
      type: "enum",
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  relations: {
    menu_category: {
      type: "many-to-one",
      target: "menu_category",
      joinColumn: {
        name: "menu_category_id",
        referencedColumnName: "id",
      },
    },
    cuisines: {
      type: "many-to-one",
      target: "cuisines",
      joinColumn: {
        name: "cuisine_id",
        referencedColumnName: "id",
      },
    },
  },
});
