const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies['token']; // Look for the token in the cookies
    if (!token) 
        res.redirect('/');

        // return res.status(403).send('Access denied');
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};
