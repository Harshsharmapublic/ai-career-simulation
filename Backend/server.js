const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/userroutes');
const app = express();
connectDB();

app.use(express.json());
app.use("/api",routes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, ()=> console.log('Server is running on port 5000')); 

// const user =require('./config/controller/usercontroller');
// app.post('/waitlist', user.createwaitlist, async (req, res) => {
//     const { first_name, last_name, email, phone_number, username } = req.body;

//     if(!first_name || !email || !phone_number || !username) {
//         await user .save();
//         res.send("user saved");
//     }
// });

