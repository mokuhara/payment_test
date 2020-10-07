const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: String,
    name: String,
    email: String,
    password: String,
    iconUrl: String,
    iconName: String,
    tag: String,
    description: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);
module.exports = mongoose.model("UserList", UsersSchema);
