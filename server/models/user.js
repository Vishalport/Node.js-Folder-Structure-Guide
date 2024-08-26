import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import { USER } from "../enums/userType";
import { ADMIN } from "../enums/userType";

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String
  },
  mobileNumber: {
    type: String,
    required: true,
    index: true
  },
  userType : {
    type : String,
    default: USER
  }
}, { timestamps: true });

const UserSchema = Mongoose.model("Users", userSchema);
userSchema.plugin(mongooseAggregatePaginate);
userSchema.plugin(mongoosePaginate);


Mongoose.model("Users", userSchema).find({ userType: userType.ADMIN }, async (err, result) => {
  if (err) {
    console.log("DEFAULT ADMIN ERROR", err);
  }
  else if (result.length == 0) {

    let obj = {
      userType: userType.ADMIN,
      firstName: "Admin",
      lastName: "Admin",
      mobileNumber: "+919931627686",
      email: "admin@gmail.com",
      profileImage: "",
      password: "admin@123",
      userType : ADMIN
    };
    Mongoose.model("Users", userSchema).create(obj, async (error) => {
      if (error) {
        console.log("Default admin  creation error", error);
      }
    });
  }
});

module.exports = UserSchema;