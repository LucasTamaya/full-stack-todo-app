import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // go ahead and fill them
});

const model = mongoose.model("UserModel", UserSchema);

export default model;
