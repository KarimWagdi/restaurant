const { EntitySchema } = require("typeorm");

const restaurant = new EntitySchema({
  name: "restaurant",
  tableName: "restaurant",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    logo: {
      type: "varchar",
    },
    cover: {
      type: "varchar",
    },
  },
  relations: {
    branches: {
      type: "one-to-many",
      target: "branches",
      inverseSide: "restaurant",
      cascade: true,
    },
  },
});

module.exports = { restaurant };
