import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            password
        });
        const newUser = await user.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        if (req.body._id) {
            return res.status(400).json({ message: 'User ID is not allowed' });
        } else if (req.body.email || req.body.username) {
            const existingUser = await User.findOne({
                $or: [{ email: req.body.email }, { username: req.body.username }]
            });
            if (existingUser && existingUser._id != req.params.id) {
                return res.status(400).json({ message: 'Email or username already exists' });
            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};