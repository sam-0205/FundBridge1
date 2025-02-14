// import { string } from "better-auth/*";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, default: "" },
  username: { type: String, required: true },
  profilepic: { type: String, default: "" },
  coverpic: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  razorpayid: {type: String},
  razorpaysecret: {type: String}
});

const User = mongoose.models.User || model("User", UserSchema);
export default User;
