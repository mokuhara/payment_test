const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = Schema({
    userId: String,
    roomUrl: String
}, {
    collection: "rooms",
});
module.exports = mongoose.model("rooms", RoomSchema);