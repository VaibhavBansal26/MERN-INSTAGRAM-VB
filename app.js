const express = require('express');
const app = express()  // Invoking express
const mongoose = require('mongoose');

//CONFIG FILE
const {MONGO_URI} = require('./config/keys') //Config file

//MONGO DB CONNECTION
mongoose.connect(MONGO_URI,{
    useNewUrlParser : true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con => {
    console.log("Connection is established")
})

//Requiring Models
const User = require('./models/userModel');
const Post = require('./models/postModel');
// require('./models/userModel')

//Middleware to Parse the incoming requests
app.use(express.json());

//Routes
app.use(require('./routes/authRoute'));
app.use(require('./routes/postRoute'));
app.use(require('./routes/userRoute'));


//Route Handler

//PORT CONFIG
const port = process.env.PORT || 5000

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

//APP listening on port 5000
app.listen(port,() =>{
    console.log(`Server is running on ${port}`)
})





//-----------------------------------------------------------------------
///XTRA WORK
/*


//CustomMiddlware Testing
const customMiddleware =(req,res,next) => {
    console.log("middleware executed");
    next();
}

//Use Of Middlware
//app.use(customMiddleware);

//Routing
app.get('/',(req,res) => {
    res.send("hello World");
})

app.get('/about',customMiddleware,(req,res) => {
    res.send("About page");
})

*/