import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No authorization key' });
    }

    jwt.verify(token, process.env.SIGN_UP,
     (err) => {
        if (err) {
            return res.status(401).json({ message: 'Authorization key is not valid' });
        }

        next();
});
};