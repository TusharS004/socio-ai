import mongoose from 'mongoose';

const dbURI = process.env.MONGODB_URI || '';

export const connect = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
