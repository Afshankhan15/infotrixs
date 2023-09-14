const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const usermodel = require('./Models/User')
const userapi = require('./Routes/User')

const dashmodel = require('./Models/UserDash')
const dashapi = require('./Routes/UserDashRoutes')

const app = express()
const PORT = 4000
 

app.use(express.json()) 
app.use(cors()) 
app.use(express.urlencoded()) 


const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
// connection to MongoDB , here DataBase = InfotrixisDB
mongoose.connect("mongodb://127.0.0.1:27017/InfotrixisDB",options).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.log("error message :",err.message);
}) 

app.use('/', userapi);

app.use('/', dashapi);

app.get('/', (req,res) => {
    res.send("Server is working Afshan")
})

app.listen(PORT, () => {
    console.log(`Server is working on port http://localhost:${PORT}`)
})