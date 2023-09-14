const express = require('express')
const router = express.Router()
const Dashmodel = require('../Models/UserDash')
const jwt = require("jsonwebtoken") 

// API --> TO ADD USER in dashboard
router.post('/addUser', async (req, res) => {
    console.log(req.body)
    const {name , email } = req.body

    const token = req.headers['x-access-token']; // get token from req headers
    const decoded = jwt.verify(token, 'secret123'); // verification of token by server using secret key 
    const userId = decoded.id; 

    try {
        const AddNewUser = await Dashmodel.create({name, email, userId})
        res.send({message: "New User Added", NewUser: AddNewUser})
    } catch (error) {
        res.send({message: "Internal server error"})
    }
})

// API ---> TO FETCH ALL ADDED USER
router.get('/getUserInfo', async (req, res) => {
    const token = req.headers["x-access-token"]
    
    try { 
        const decoded = jwt.verify(token, 'secret123')
        const userId = decoded.id

        const Info = await Dashmodel.find({userId})
        res.status(201).send({ message: 'Token Valid', ALLUser1: Info });

    } catch (error) {
        res.send({message: "Internal server error"})
    }
})

// API --> TO DELETE USER
router.post('/deleteUser', async (req, res) => {
    console.log(req.body)
    const { id } = req.body; // receive id from req.body/CLIENT
    const token = req.headers["x-access-token"]

    try { 

        const decoded = jwt.verify(token, 'secret123')
        const userId = decoded.id

      const deleteUser =  await Dashmodel.findByIdAndDelete(id); // Delete the User by _id
  
      const AllUserInfo = await Dashmodel.find({ userId }); // Fetch ALL user info belonging to the userID

      res.send({ message: 'User Deleted successfully', AllUserDetail: AllUserInfo, DeletedUser: deleteUser });
    
    } catch (err) {
      res.send({message: "Internal server error "});
    }
  });



// API ---> TO UPDATE USER REGISTERED SLOT
router.post('/userUpdate/:id', async (req, res) => {
    const { id } = req.params; // Receive id from the URL
    const { name , email } = req.body; // Receive selectedSlot from req.body
    const token = req.headers["x-access-token"];
  
  
    try {
      const decoded = jwt.verify(token, 'secret123');
      const userId = decoded.id;
  
  
      // Check if the user with the given ID belongs to the authenticated user
      const UserToUpdate = await Dashmodel.findOne({ _id: id, userId}); // Find the User by ID and user ID
  
  
      if (!UserToUpdate) {
        return res.status(404).send({ message: 'User not found or does not belong to the user' });
      }
  
  
      // Update the name and email by _id
  
      UserToUpdate.name = name; // modify name
      UserToUpdate.email = email;  // modify email
      const updatedUser = await UserToUpdate.save();
  
      // Fetch ALL user info belonging to the userID
      const userInfoData = await Dashmodel.find({ userId });
  
      res.send({ message: 'User updated successfully', UserData: userInfoData, UpdatedSlot: updatedUser });
  }catch (err) {
      console.log("Error in server", err);
      res.status(500).send({ message: "Internal server error" });
    }
  });
  

module.exports = router;