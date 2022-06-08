import Router from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';

import User from './user.model.js';

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
            const hashPassword = bcrypt.hashSync(password, 15);
            const user = new User({email, password: hashPassword});
            await user.save();
            return res.json({message: "User was created!"});
    } catch (e) {
        console.log(e);
        res.send({message: "Server error"})
    }
});

export default authRouter;