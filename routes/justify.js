const constants = require('../utils/constants');
const justification = require('../utils/justification');
const router = require('express').Router();
const express = require('express');
const DailyWord = require('../model/DailyWord');


const verify = require('./verifyToken');

router.use(express.text())
router.post('/',verify, async (req, res) => {

    const tokenBearer = req.header('Authorization');//to get the tokenBearer in the header
    const token = tokenBearer.split(' ')[1];//token without the suffix 'Bearer'
    const today = Intl.DateTimeFormat('fr-CA').format(Date.now());//the date in format yyyy-mm-dd

    //number of words entered by the user
    const countWord = req.body.split(/\s+/).length;
    
   //get the text (req.body) justified by the justification function
   const justifyText = justification(req,res,countWord);

   const dailyWord = await searchDailyWord(token,today,countWord);
  
   if(dailyWord && dailyWord.nbWord > constants.NB_MAX_WORD){
    res.status(402).send(' Payment Required');
    }else{
        res.set('Content-Type', 'text/plain');
        res.send(justifyText);
       dailyWord.save();
        
    }
   

  
})

const searchDailyWord = async(token, today, nbWord ) => {
    const dailyWord = await DailyWord.findOne({ token: token, date : today });
   
    if (!dailyWord){
        const newDailyWord = new DailyWord({
             token: token,
             date: today,
             nbWord: nbWord
         });

         try {
            dailyWord = await newDailyWord.save();
           
        } catch (err) {
            return err;
        }

    } else {
        dailyWord.nbWord += nbWord;
       
    }

    return dailyWord;

}


module.exports = router;