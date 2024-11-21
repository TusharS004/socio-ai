import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign({ _id: userId }, secretKey, {
        expiresIn: '2h',
    });
    return token;
};

export default generateToken;