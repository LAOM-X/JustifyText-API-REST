const router = require('express').Router();
const verify = require('./verifyToken');


router.post('/',verify, (req, res) => {

   
    try {
        res.send({ text: req.body });
    } catch (err) {
        res.status(401).send(err);
    }
    // res.json({
    //     posts:{
    //         title:'my first post',
    //         description:'random data shouldn\'t access '
    //     }
    // })
})


module.exports = router;