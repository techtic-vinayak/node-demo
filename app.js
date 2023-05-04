const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000

const userRoutes = require("./server/routes/userRoute");
var path = require('path');

// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array())
app.use(express.static(path.join(__dirname, '/uploads')));
app.use('/api/v1/user',userRoutes)

app.get('/',(req,res)=>{
    res.send('check express')
})
app.listen(port,()=>{
    console.log(`we are listen server at ${port}`)
})


// const http = require('http')
// const port = process.env.port || 3000
// const birthdate = new Date('1999-11-10').toLocaleDateString();
// http.createServer(function (request, response) {   
//     response.end(birthdate);  
// }).listen(port); 
 
