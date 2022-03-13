const router=require("express").Router()
const paymentCtrl=require("../controllers/PaymentCtrl");
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");


router.route("/payment")
.get(auth,authAdmin,paymentCtrl.getpayment)
.post(auth,paymentCtrl.createpayment)


module.exports=router;