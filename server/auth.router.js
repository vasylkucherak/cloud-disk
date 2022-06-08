import Router from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from './user.model.js';
import Key from './key.js';

const authRouter = new Router();

authRouter.post('/registration', 
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})
    ], async (req, res) => {
    try {
        const validErrors = validationResult(req);
            if (!validErrors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", validErrors});
            }
        const {email, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: `User with email ${email} alredy exist.`});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({email, password: hashPassword});
            await user.save();
            return res.json({message: "User was created!"});
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"})
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: "User not found"});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: "Invaild password"});
            }
            const token = jwt.sign({id: user.id}, Key.secretKey, {expiresIn: "1h"});
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            });
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"})
    }
});

export default authRouter;