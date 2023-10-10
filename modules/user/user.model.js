const mongoose=require('mongoose')
const bcrypt=require("bcrypt")
let saltrounds=5;

let userSchema=mongoose.Schema({
 firstName:{type:String,required:true},
 lastName:{type:String,required:true},
 email:{type:String,required:true},
 password:{type:String,required:true},
 phone:{type:String,required:true},
 
})

userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,saltrounds);
    next();
  })

let userModel=mongoose.model("user",userSchema)

module.exports=userModel