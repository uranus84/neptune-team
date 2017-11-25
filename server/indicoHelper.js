var indico = require('indico.io');

var sendIndicoData = (req, res, tweetArr) => {
  var positivityScore;
  var personalityScores;
  indico.sentimentHQ(tweetArr)
  .then((score) => { 
    //score is an array of the scores of each tweet. we want to get the average of them
    var sum = 0;
    score.map( (val) => { sum += val })
    positivityScore = sum / score.length;

    //send response if all scores have reseolved
    if (positivityScore && personalityScores) {
      res.status(200);
      res.end(JSON.stringify({'positivityScore': positivityScore, 'personalityScores': personalityScores}));
    }
  })
  .catch((err) => {console.log(err)});

  //get personality scores
 indico.personality(tweetArr)
  .then((score) => { 
    //score is an array of the personality scores of each tweet. we want to get the average of them
    // we make a placeHolder as to not disrupt the if statement at the end
    personalityScoresHolder = {
      openness: 0,
      extraversion: 0,
      agreeableness: 0,
      conscientiousness: 0
    }
    score.map( (val) => { 
      personalityScoresHolder.openness += val.openness;
      personalityScoresHolder.extraversion += val.extraversion;
      personalityScoresHolder.agreeableness += val.agreeableness;
      personalityScoresHolder.conscientiousness += val.conscientiousness;
    })

    for (var i of Object.keys(personalityScoresHolder)) {
      personalityScoresHolder[i] = personalityScoresHolder[i] / score.length;
    }

    personalityScores = personalityScoresHolder;

    if (positivityScore && personalityScores) {
      res.status(200);
      res.end(JSON.stringify({'positivityScore': positivityScore, 'personalityScores': personalityScores}));
    }
  })
  .catch((err) => {console.log(err)});
}

module.exports.sendIndicoData = sendIndicoData;

