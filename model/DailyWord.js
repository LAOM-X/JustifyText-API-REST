const mongoose = require('mongoose');

const dailyWordSchema = new mongoose.Schema({
    token: {
        type: String
    },
    date: {
        type: String //type date formatted to string during the save
    },
    nbWord: {
        type: Number //daily number of words
       
    }
    
});
//to have the number of words according to the token and the date
//will be used for the rate limit
dailyWordSchema.index({ token: 1, date: 1 }, { unique: true })

module.exports = mongoose.model('DailyWord', dailyWordSchema);