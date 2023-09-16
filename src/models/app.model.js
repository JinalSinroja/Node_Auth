const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let appSchema = new Schema(
  {
    title: String,
  },
  {
    collection: "exampleCollection",
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("appSchema", appSchema);
