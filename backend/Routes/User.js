const express = require("express");
const router = express.Router();

const UserModel = require('../Models/User')

const jwt = require("jsonwebtoken"); // npm install jsonwebtoken


// Register --> API
router.post("/register", async (req, res) => {
  console.log(req.body); // rough
  const { name, email, password } = req.body;
  try {
    const Existinguser = await usermodel.findOne({ email });
    if (Existinguser) {
      res.send({ message: "User already registered" });
    } else {
      const NewUser = await usermodel.create({ name, email, password });
      res.send({ message: "Successfully Registered" });
    }
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});

router.post('/login', async (req, res) => {
  const {email, password } = req.body;

  try {
    const Existinguser = await usermodel.findOne({ email });
    if (Existinguser) {  
       
       const Matchtpswd = password === Existinguser.password

       if(Matchtpswd) {
        const token = jwt.sign(
          {
             email: Existinguser.email,
             id: Existinguser._id
          }, 
          'secret123'
        )
    
      res.send({ message: "Login Successfully", LoginUser: Existinguser, userToken:token});
      }
      else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    } 
  } catch (err) {
    res.send({ message: "Server error" });
  }
});  




module.exports = router;
