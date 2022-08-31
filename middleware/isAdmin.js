import user from '../../models/user.js';
import { authUserId } from "./authUserId.js";

export const isAdmin = async(req,res,next) =>{

    try {
        
        const authHeader = req.headers['authorization'];
        const id = authUserId(authHeader);
        const User = await user.findOne({ _id: id });

        if (!User) {
            return res.status(400).json({
                error: 'Unauthorized',
                message: 'Invalid Email/Password',
            });
        } else {
            if (User.isAdmin === false) {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Access Not Allowed.',
                });
            } else if (User.isAdmin === true) {
                next();
            }
        }
    } catch (err) {
        next(err);
    }
}