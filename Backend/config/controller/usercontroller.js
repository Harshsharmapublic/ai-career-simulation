const usermodel = require("../../config/models/userschema");

const user = async (req, res) => 

   { const { first_name, last_name, email, phone_number, username } = req.body;

    if(!first_name || !email || !phone_number || !username) {
        return res.status(400).json({ 
            status: 'error',
            message: 'Please fill in all required fields' })
        }


        const newuser = new usermodel({
            first_name,
            last_name,
            email,
            phone_number,
            username})

            await newuser.save();

            return res.status(201).json({
                message:"User created"
            })
        }
    

module.exports = { user };