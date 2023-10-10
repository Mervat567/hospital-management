const router=require("express").Router();
const userController=require("../../controllers/user/user.controller")

router.post("/signUp",userController.addUser)
router.post("/signIn",userController.login)
router.post("/logOut",userController.logout)
router.put("/resetPassword",userController.resetPassword)

module.exports=router