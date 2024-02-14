const UserModel = require('../models/UserModel');

const createUser = async(req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(200).json({
            user
        });
    } catch(error) {
       res.status(500).json({message: error.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!user) {
            res.status(404).json({message: 'User not found!'}); 
        }
        res.status(200).json(user);
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if(!user) {
            res.status(404).json({message: 'User not found!'}); 
        }
        res.status(200).json({message: 'User has been deleted.'});
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}