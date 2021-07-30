const mongoose = require('mongoose');

const dailyWordSchema = new mongoose.Schema({
    token: {
        type: String
        
    },
    date: {
        type: Date,
        default: Date.now()
    },
    numberOfWords: {
        type: String,
        unique: true,
       
    }
    
});


module.exports = mongoose.model('DailyWord', dailyWordSchema);