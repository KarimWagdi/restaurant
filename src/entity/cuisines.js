const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "cuisines",
  tableName: "cuisines",
  columns: {
    id: {
      type: "int",
      generated: true,
      primary: true,
    },
    name: {
      type: "varchar",
    },
    img: {
      type: "varchar",
    },
  },
});
