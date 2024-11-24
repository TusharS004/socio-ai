import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    try {
        const token = req?.cookies?.token || req.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).send({ message: 'No token provided!' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).send({ message: 'Unauthorized!' });
            }
            req.user = decoded;
        });
        if (!req.user._id) {
            return res.status(403).send({ message: 'Invalid Token' });
        }
        next();

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

export default verifyToken;