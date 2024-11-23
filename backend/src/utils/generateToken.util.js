import jwt from 'jsonwebtoken';

const generateToken = async (userId) => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        console.error('JWT secret key not found');
        process.exit(1);
    }

    const token = jwt.sign({ _id: userId }, secretKey, {
        expiresIn: '2h',
    });
    return token;
};

export default generateToken;