import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         index: true
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true
      },
      fullname: {
         type: String,
         required: true,
         trim: true,
         index: true
      },
      avatar: {
         type: String,   // cloudnary URL
         required: true,
      },
      coverImage: {
         type: String,   // cloudnary URL
      },
      watchHistory: [
         {
            type: Schema.Types.ObjectId,
            ref: "video"
         }
      ],
      password: {
         type: String,
         required: [true, "password is required"]
      },
      refreshToken: {
         type: String
      }
   }, { timestamps: true })


// password incryption by hook called "pre"
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next()
})

// check password is correct or not by "user defined method"  
userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
}

// generating Access token by JWT 
userSchema.methods.generateAccessToken = function () {
   return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
   },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}

// generating Refresh token by JWT 
userSchema.methods.generateRefreshToken = function () {
   return jwt.sign({
      _id: this._id
   },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}
export const User = mongoose.model("User", userSchema);