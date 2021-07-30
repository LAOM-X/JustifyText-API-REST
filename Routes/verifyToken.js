const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token)
    return res.status(401).send('Acces Denied');

    try{
        const verified = jwt.verified(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}