let repo=require("../../modules/user/user.repo")
let jwt=require("jsonwebtoken")

const activeTokens = [];

const generateToken=(payload)=>
jwt.sign({userId:payload},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.EXPIRE_TIME
    })
let addUser = async(req, res) => {
    try{
    const user=await repo.signUp(req.body)
   const token= generateToken(user._id)
     res.status(201).json({data:user,token})      
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }

 let login=async(req,res)=>{
    try{
    const{email,password}=req.body
    const result=await repo.signIn(email,password)
    if(result.success){
    const token=generateToken(result._id)
    activeTokens.push(token)
     res.status(200).json({data:result,token}) 
    }
    else{
    res.status(result.code).json(result)  
    }
   
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})    
    }
 }
let logout=async(req,res)=>{
    try{
        const token = req.header('Authorization');
        const recievedToken=token.trim()
        if (activeTokens.includes(recievedToken)) {
            activeTokens.splice(activeTokens.indexOf(token), 1);
            res.json({ message: 'Logout successful' });
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
   }
   catch(err){
    res.status(500).json({err: "Unexpected Error!"})    
}
}

let resetPassword = async (req, res) => {
    try {
        const result = await repo.resetPassword(req.body.email, req.body.newPassword);
        res.status(result.code).json(result);
    } catch (err) {
      console.log(`err.message`, err.message);
      res.status(500).json({
        success: false,
        code: 500,
        error: "Unexpected Error!"
      });
    }
}

 module.exports={
  addUser,
  login,
  logout,
  resetPassword
 }