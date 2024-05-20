import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const SIGN_UP = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const user = new userModel ({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })

        const response = await user.save();

        return res.status(200).json({message: 'user was created', user: response})
    }catch(err) {
        return res.status(400).json('Validation was unsuccessful')
    }
}

export const LOG_IN = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})

        if(!user) {
            return res.status(404).json({message: 'bad email or password'})
        }

        const isPasswordMatch = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!isPasswordMatch) {
            return res.status(404).json({message: 'bad email or password'})  
        }

        const jwt_token = jwt.sign(
            {email: user.email, user_id: user.id, type: 'access'},
            process.env.SIGN_UP,
            {
                expiresIn: "2h"
            }
        )

        return res.status(200).json({message: 'logged in successfully', jwt: jwt_token})

    }catch(err) {
        return console.log({err: err})
    }
}