const Payments = require("../models/PaymentModel");
const Users = require("../models/userModel");
const Products=require("../models/productModel")



const paymentCtrl = {
  getpayment: async (request,response) => {
    try {
      const payments = await Payments.find();
      response.json(payments);
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  createpayment: async (request, response) => {
    try {
      const user = await Users.findById(request.user.id).select("name email");
      if (!user)
        return response.status(500).json({ msg: "User does not Exist" })

        const {cart,paymentID,address}=request.body;

        const {_id,name,email}=user;
        
        const newPayments=new Payments({
            user_id : _id,name,email,cart,paymentID,address
        })
       
        //filtering sold qunatities//

        cart.filter(item=>{
          return sold(item._id,item.quantity,item.sold)
        })

       await newPayments.save()
        response.json({msg:"Payment Success!!"})
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
};

const sold=async(id,quantity,oldsold)=>{
  await Products.findOneAndUpdate({_id:id},{
    sold : quantity + oldsold
  })
}

module.exports = paymentCtrl;
