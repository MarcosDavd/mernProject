import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
  token : { type: String,default: null },
  otp: { type: String, default: null },
  otpExpiry: { type: Date, default: null },
}, { timestamps: true });

// { timestamps: true } esto crea createdAt y updaateAt automaticamente en la bd
/*
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
*/
export const User = mongoose.model("User", UserSchema);
export default User;
