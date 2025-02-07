const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "open_hours",
  tableName: "open_hours",
  columns: {
    id: {
      type: "int",
      generated: true,
      primary: true,
    },
    day: {
      type: "varchar",
    },
    start_date: {
      type: "date",
    },
    end_date: {
      type: "date",
    },
  },
  relations: {
    branchOpenHour: {
      target: "branches",
      type: "many-to-one",
      joinColumn: { name: "branch_id", referencedColumnName: "id" },
    },
  },
});
