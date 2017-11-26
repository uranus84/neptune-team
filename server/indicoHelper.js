var indico = require('indico.io');

var sendIndicoData = (req, res, tweetArr) => {
  var positivityScore;
  var personalityScores;
  //joining tweets instead of submitting and array due to free API plan
  indico.sentimentHQ(tweetArr.join(" "))
  .then((score) => { 
    //adding the below line because we are submitting one long string instead of 100 tweets due to free API plan.
    score = [score]
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

  //joining tweets instead of submitting and array due to free API plan
 indico.personality(tweetArr.join(" "))
  .then((score) => { 
    //adding the below line because we are submitting one long string instead of 100 tweets due to free API plan
    score = [score]
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

