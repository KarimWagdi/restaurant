const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "branches",
  tableName: "branches",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    lat: {
      type: "varchar",
    },
    long: {
      type: "varchar",
    },
    rate: {
      type: "double",
    },
    state: {
      type: "enum",
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  },
  relations: {
    restaurant: {
      type: "many-to-one",
      target: "restaurant",
      joinColumn: {
        name: "restaurant_id",
        referencedColumnName: "id",
      },
      inverseSide: "branches",
    },
    menu: {
      type: "one-to-one",
      target: "menu",
      inverseSide: "branch",
    },
  },
});
