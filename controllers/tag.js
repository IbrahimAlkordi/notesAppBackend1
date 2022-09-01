const Tag = require('../models/tag');
const User = require("../models/user");


exports.createTag = async (req, res, next) => {
    
    const id = req.userId;
    const name = req.body.name;
    try {
    const tag = new Tag({
        name: name, 
        createdBy: id, 
    });
    
        const tagResult = await tag.save();
        const user = await User.findById(id);
        const userResult = await user.save();
        res.status(201).json({
            message: "tag Created",
            tag: tagResult, 
            creator: {_id: user._id, name: user.name}
        });
    }
    catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }

};