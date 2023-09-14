const mongoose = require("mongoose")

const DashSchema = new mongoose.Schema ({
    name: {
    type: String,
    required : true,
   },
   email: {
    type: String,
    required: true,
   },
   userId: {
    type: String, // or ObjectId, depending on how you store user IDs
    required: true,
},
});


Dashmodel = new mongoose.model("Dashmodel", DashSchema); 
module.exports = Dashmodel;