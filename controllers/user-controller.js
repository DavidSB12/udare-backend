const User = require("../model/User.js");
const { ObjectId } = require('mongodb');


const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find();
        return res.status(200).json(users);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}


const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
    } 
    catch (error) {
      console.error('Error getting user by ID:', error);
      res.status(500).json({ error: 'Error retrieving user by ID.' });
    }
}


const addUser = async (req,res) => {
    const {username, password, email, profile} = req.body;    

    try {
        const newUser = new User({
          username,
          password,
          email,
          profile,
        });
        await newUser.save();
        res.status(201).json(newUser);
      } 
      catch (error) {
        console.error('Error adding a new user:', error);
        res.status(500).json({ error: 'Error adding a new user' });
      }
}

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(updatedUser);
    } 
    catch (error) {
      console.error('Error updating user by ID:', error);
      res.status(500).json({ error: 'Error updating user by ID.' });
    }
}

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const deletedUser = await User.findByIdAndRemove(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ message: 'User deleted successfully.' });
    } 
    catch (error) {
      console.error('Error deleting user by ID:', error);
      res.status(500).json({ error: 'Error deleting user by ID.' });
    }
}

const deleteAllUsers = async (req, res) => {
    try {
      await User.deleteMany({}); 
      res.status(200).json({ message: 'All users deleted successfully.' });
    } 
    catch (error) {
      console.error('Error deleting all users:', error);
      res.status(500).json({ error: 'Error deleting all users.' });
    }
}




module.exports = {
    deleteUserById,
    updateUserById,
    getUserById,
    getAllUsers,
    addUser
}