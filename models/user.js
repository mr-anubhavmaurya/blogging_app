const { createHmac, randomBytes } = require("node:crypto");
const { Schema, model } = require("mongoose");
const { type } = require("node:os");
const { generateToken } = require("../services/jwtAuth");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      defalut: "user",
    },
    profileImageURL: {
      type: String,
      default: "/images/user_avatar.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashPassword;

  next();
});
//virtual function
userSchema.static("matchPasswordAndToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found!");

  const salt = user.salt;
  const hashPassword = user.password;
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashPassword !== userProvidedHash) throw new Error("Incorrect password");

  const token = generateToken(user);
  return token;
})
const User = model("User", userSchema);
module.exports = User;
