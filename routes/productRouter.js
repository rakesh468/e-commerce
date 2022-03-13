const router=require("express").Router();
const productCtrl=require("../controllers/productCtrl");
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");


router.route("/products")
.get(productCtrl.getProducts)
.post(auth,authAdmin,productCtrl.createProduct)



router.route("/products/:id")
.put(auth,authAdmin,productCtrl.updateproduct)
.delete(auth,authAdmin,productCtrl.deleteProduct)






module.exports=router;