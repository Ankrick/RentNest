import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try{
        //db operations
        const { username, email, password } = req.body;

        // HASH THE PASSWORD
        let salt = await bcrypt.genSalt();
        let hashPassword = await bcrypt.hash(password, salt)

        
        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password : hashPassword
            },
        });

        console.log(newUser);

        res.status(200).json({message : "User created successfully"});
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

export const login = async (req, res) => {
    //db operations
    const {username, password} = req.body;

    try{
    //CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
        where: {username}
    })

    if(!user) return res.status(401).json({message : "Invalid credentials"});

    //CHECK USER PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.status(401).json({message : "Invalid credentials"});

    Age = 1000*60*60*24*7;

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET_KEY, { expiresIn : Age });

    //GENERATE COOKIE TOKEN AND SEND TO THE USER
    res.cookie("token", token, {
        httpOnly : true,
        maxAge : 1000*60*60*24*7
        //secure : true
    }).status(200).json({message : "login success"})
        
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

export const logout = (req, res) => {

    res.clearCookie("token").status(200).json({message : "logout success"});
    //db operations

}