import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }
  this.password=await bcrypt.hash(this.password, 10);
});
// Comparo la contrseña
UserSchema.methods.matchPassword = async function (passIngresada) {
  return await bcrypt.compare(passIngresada, this.password);
}
export default mongoose.model("User", UserSchema);
