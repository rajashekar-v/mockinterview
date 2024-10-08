const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {

    try{
        const reqToken = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(reqToken,process.env.JWT_KEY);
        req.userDetails = decodeToken;
        next();
    }catch(err)
    {
        return res.sendResponse(401,{},'Provided Invalid Token',err);
    }
    
}

module.exports = validateToken;