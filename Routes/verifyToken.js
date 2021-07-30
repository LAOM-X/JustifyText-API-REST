const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const tokenBearer = req.header('Authorization');

    if(!tokenBearer)
    return res.status(401).send('Acces Denied');

    try{
       const token = tokenBearer.split(' ')[1];
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
  };
}