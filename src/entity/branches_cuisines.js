const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "branches_cuisines",
  tableName: "branches_cuisines",
  columns: {
    id: {
      type: "int",
      generated: true,
      primary: true,
    },
    state: {
      type: "enum",
      enum: ["active", "holding"],
      default: "active",
    },
  },
  relations: {
    branches: {
      type: "many-to-one",
      target: "branches",
      joinColumn: {
        name: "branch_id",
        referencedColumnName: "id",
      }
    },
    cuisines: {
      type: "many-to-one",
      target: "cuisines",
      joinColumn: {
        name: "cuisine_id",
        referencedColumnName: "id",
      }
    }
  }
});
