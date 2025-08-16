const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
   firstName:{
    type:String,
    required:[true,"first name is required"],
    minlength:[5,"first name must be atleast 5 character long"],
    lowercase:true,
    trim:true, // if user gives extra spaces in starting and end then it will
    // automatically remove it
    maxlength:[20,"first name should be less than or eqaul to 20 characters"]
   },

   lastName:{
    type:String,
    required:[true,"second name is required"],
    minlength:[5,"second name must be atleast 5 character long"],
    lowercase:true,
    trim:true, // if user gives extra spaces in starting and end then it will
    // automatically remove it
    maxlength:[20,"last name should be less than or eqaul to 20 characters"]
   },
   mobileNumber:{
     type:String,
     trim:true,
     maxlength:[10,"phone number should be of length 10"],
     minlength:[10,"phone number should be of length 10"],
     unique:[true,"phone number is already in use"],
     required:[true,"phone number should be provided"]
   },
   email:{
    type:String,
    trim:true,
    required:[true,"Email should be provided"],
    unique:[true,"Email is already in use"],
     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   password:{
     type:String,
     required:[true,"password should be provided"],
     minlength:[6,"password should be minimum 6 character long"]
   }
},{
    timestamps:true
});

 userSchema.pre('save',async function(){
   // here we can modify our user before it is saved in mongodb
   const hashedPassword= await bcrypt.hash(this.password,10);
   this.password=hashedPassword;
   
 })

const User=mongoose.model("User",userSchema); // collection
module.exports=User;