const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payments=require("../models/PaymentModel");


const userCtrl = {
  register: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      const user = await Users.findOne({ email });
      if (user)
        return response.status(400).json({ msg: "Email already Exist" });

      if (password.length < 6)
        return response
          .status(400)
          .json({ msg: "Password should  have atleast  6 characters" });

      //password encryption//
      const passwordhash = await bcrypt.hash(password, 10);
      const newUser = new Users({ name, email, password: passwordhash });

      //save to db//
      await newUser.save();

      //Then create jsonwebtoken to authentication//
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      response.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge:7*24*60*60*1000
      });

      response.json({ accesstoken });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = await Users.findOne({ email });
      if (!user)
        return response.status(400).json({ msg: "Invalid Credentials" });

      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch)
        return response.status(400).json({ msg: "Invalid Credentials" });

      //if login successefull create access token and refresh token//

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      response.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge:7*24*60*60*1000
      });

      response.json({ msg: "Login Successfully", accesstoken });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  logout: async (request, response) => {
    try {
      response.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return response.json({ msg: "Logged out" });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  refreshToken: (request, response) => {
    try {
      const rf_token = request.cookies.refreshtoken;
      if (!rf_token)
        return response.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return response.status(400).json({ msg: "Please Login or Register" });
        const accesstoken = createAccessToken({ id: user.id });
        response.json({ accesstoken });
      });
      // response.json({rf_token})
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  getuser:async(request,response)=>{
    try {
      const user=await Users.findById(request.user.id).select('-password')
      if(!user)
      return response.status(400).json({msg:"User does not Exists"});
      response.json(user)
      
    } catch (error) {
      return response.status(500).json({msg:error.message});
    }
  },
  addCart:async(request,response)=>{
    try {
      const user=await Users.findById(request.user.id)
      if(!user)
      return response.status(400).json({msg:"User  does not exist"})

      await Users.findOneAndUpdate({_id:request.user.id},{
        cart: request.body.cart
      })
      return response.json({msg:"Added to the Cart"})
    } catch (error) {
     return response.status(500).json({msg:error.message})
      
    }
  },
  history:async(request,response)=>{
    try {
      const result=await Payments.find({user_id:request.user.id})
      response.json(result)
    } catch (error) {
      return response.status(500).json({msg:error.message})
    }
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = userCtrl;
