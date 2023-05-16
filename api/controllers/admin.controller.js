import createError from "../utils/createError.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js"

export const getAllUsers = async (req, res, next) => {
    const users = await User.find({})
    res.status(200).send(users)
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {isVerified: true},
            {new: true}
        );
        res.status(200).send(updatedUser);
    } catch (err) {
        next(err);
    }
}

export const addCategory = async (req, res, next) => {
    try {
        const cat = await Category.findOne({category: req.body.category});
        if(cat) return next(createError(409, "category already exists!!!!"))
        const newCategory = new Category({...req.body});
        newCategory.save()
        res.status(201).send("New category added")
    } catch(err){
        next(err)
    }
}