const User=require('./user.model')
const bcrypt=require("bcrypt")


exports.existingUser=async(filter)=>{
  try{
  let user=await User.findOne(filter)
  if(user){
    return {
      code:200,
      success:true,
      record: user
    };
  }
  else{
    return{
    code: 404,
    error: "user is not found",
    }
  }
  }catch(error){
    console.log("error"+error.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
  }
}
}
exports.signUp=async(form)=>{
   try{
  let user=await this.existingUser({email:form.email})
  if(!user.success){
  const newUser= new User(form)
  await newUser.save()
    return {
    code:201,
    success:true,
    record:newUser
   }
}
  else{
    return{
    code:400,
    error:"User already exists"    
       }
  }

}catch(error){
    console.log("error"+error.message)
    return{
    code:500,
    success:false,
    error:"unexpected error"
    }
}
} 

exports.signIn=async(email,password)=>{
 try{
    email=email.toLowerCase()
    let user=await this.existingUser({email})
    if(user.success){
     let match=await bcrypt.compare(password,user.record.password)
     if(match){
       return{
       success:true,
       record:user.record,
       code:200
       }
     }
     else{
       return{
         success:false,
         code:409,
         error:"incorrect password"
         } 
     }
    }
     else return {
        success: false,
        error: user.error,
        code: 404
      }
 }catch(error){
    console.log("error"+error.message)
    return{
    code:500,
    success:false,
    error:"unexpected error"
    }
 }
}


exports.resetPassword = async (email, newPassword) => {
  try {
    email = email.toLowerCase()
    let user = await this.existingUser({email})
    let saltrouds = 5;
    if (user.success) {
      let hashedPassword = await bcrypt.hash(newPassword, saltrouds)
      await User.findOneAndUpdate({email}, {password: hashedPassword })
      return {
        success: true,
        code: 200
      };
    } else return {
      success: false,
      code: 404,
      error: user.error
    };
  } catch (err) {
    console.log(`err.message`, err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error!"
    };
  }
}






















 //register=sign up=to create an account ,login=sign in=to open a session with an account that isalready created