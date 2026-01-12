
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserDetails= new mongoose.Schema({
   username:{
    type:String,
    required:[true,"please provide a username"],
    unique:true,
    trim:true,
    minlength:[3,"username must be 3 characters long"]
   },
   email:{
    type:String,
    required:[true,"Please Provide a valid Email"],
    unique:true,
    lowercase:true,
    match:[/^\S+@\S+\.\S+$/,"please provide a valid email"]
   },
   password:{
    type:String,
    required:[true,"Please Provide a valid Password"],
    minlength:[6,"password must be atleast six character long"],
    select:false,
   },
   profile_image:{
    type:String,
    default:null,
   }
},
   {
    timestamp:true
   }
);

UserDetails.pre('save',async function (next) {
    if(!this.isModified('Password')){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.Password=await bcrypt.hash(this.Password,salt);
});

UserDetails.method.matchPassword= async function (enterpassword) {
    return await bcrypt.compare(enterpassword,this.password)
    
}
const User= mongoose.Model(User,UserDetails);
export default User;