
const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')

exports.register = async (req,res) => {
    //code
    try {
        //code
        const { email , password } = req.body
        if(!email) {

            //step 1 Validate body
            return res.status(400).json({message : "Email is required!!!"})
        }
        if(!password) {
            return res.status(400).json({ message : " Password is required!!!" })
        }

        //step 2 Check Email in DataBase already exist? 

        const user = await prisma.user.findFirst({
            where : {
                email : email
            }
        })
        if(user) {
            return res.status(400).json({ message : "Email already exists !!!"})
        }

        //step 3 HashPassword
        const hashPassword = await bcrypt.hash(password,10)
        // console.log(hashPassword)

        //step 4 Register
        await prisma.user.create({
            data : {
                email : email,
                password : hashPassword
            }
        })


        
        res.send('Register Success')
    }catch (err) {
        //err
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }

}

exports.login = async (req,res) => {
    try {
        //code
        const { email , password } = req.body

        //step 1 Check email
        const user = await prisma.user.findFirst({
            where : {
                email: email
            }
        })
        if(!user || !user.enabled) {
            return res.status(400).json({ message : 'User not found or not enabled'})
        }
        //step 2 Check password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.status(400).json({ message : ' Password Invalid!!!'})
        }

        //step 3 Create Payload
        const payload = {
            id : user.id,
            email : user.email,
            role : user.role
        }
        
        //step 4 Generate Token
        jwt.sign(payload,process.env.SECRET,{
            expiresIn : '1d'
        },(err,token) => {
            if(err) {
                return res.status(500).json({ message : "Server Error"})
            }
            res.json({ payload ,token})
        })

       
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}

exports.currentUser = async (req,res) => {
    try {
        //code
        const user = await prisma.user.findFirst({
            where : {email: req.user.email},
            select: {
                id:true,
                email : true ,
                name : true,
                role: true
            }
        })
        res.json({user})
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}





