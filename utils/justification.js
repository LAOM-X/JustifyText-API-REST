const constants = require('./constants');
const justification = function (req, res,countWord) {

    const wordsWithSpace = req.body.split(/(\s+)/);
    //if the number words is more than the max value(NB_MAX_WORD)
    if (countWord > constants.NB_MAX_WORD) {
        res.status(402).send(' Payment Required');
    }

    let justifyText = '';
    let newLine = '';
    wordsWithSpace.forEach(word => {
       // console.log('count', countWord);
        //if is a word without space
        if (!word.match(/(\s+)/)) {
            if ((newLine.length + word.length) < constants.NB_MAX_CHAR_LINE) {
                newLine = newLine.concat(newLine ? ' ' : '', word);
            } else {
                //Stretch newLine when is necessary
                if (newLine.length > (constants.NB_MAX_CHAR_LINE * constants.PERCENT_WORD_JUSTIFY)) {
                    newLine = spacesDistribution(newLine);
                }
                justifyText = justifyText.concat(justifyText ? '\n' : '', newLine);
                newLine = word;
            }

        } else { //if is a word with space

            //test if there are most than two LF (Paragraph)
            if (word.match(/\n{2,}/)) {
                justifyText = justifyText.concat('\n', newLine);
                newLine = '';
            }
        }

    });
    //to process the last line
    if (newLine) {
        justifyText = justifyText.concat("\n", newLine);
    }

    try {
        return justifyText;
    } catch (err) {
        res.status(400).send(err);
    }

}


const spacesDistribution = (text) => {
    const restChar = constants.NB_MAX_CHAR_LINE - text.length;


    const words = text.split(/\s/);
    const nbInterval = words.length - 1;

    const middleWordWithMaxSpace = restChar % nbInterval;
    const minSpace = Math.trunc(restChar / nbInterval);
    const borneInf = Math.trunc((nbInterval - middleWordWithMaxSpace) / 2);
    const borneSup = nbInterval > restChar ? borneInf + restChar : nbInterval - borneInf;
    let nbSpace = minSpace + 1;

    let justifyText = ''
    words.forEach((word, index) => {
        if (index > borneInf && borneSup >= index) {
            nbSpace = minSpace + 2;
        } else {
            nbSpace = minSpace + 1;
        }
        if (justifyText) {
            justifyText = justifyText.concat(' '.repeat(nbSpace), word);
        } else {
            justifyText = word
        }

    });


    return justifyText;

}

module.exports = justification;