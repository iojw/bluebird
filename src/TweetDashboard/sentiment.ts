const vader = require("vader-sentiment");
var emojiText = require("emoji-text");

// Return a normalized score between -1 and 1 representing relative sentiment
export const calculateSentiment = (text: string): number => {
  // TODO: This doesn't handle chained emojis properly
  const parsedText = emojiText.convert(text, {
    delimiter: " ",
    field: "description",
  });
  return vader.SentimentIntensityAnalyzer.polarity_scores(parsedText).compound;
};

// Unused; requires 'sentiment' library
// const SENTIMENT_RANGE = 5;
// const analyzer = new Sentiment();
// const calculateAFINN = (text: string): number => {
//   const analysis = analyzer.analyze(text);

//   // Currently we calculate the average sentiment of ONLY words that have a sentiment value
//   const sentiment =
//     analysis.score > 0
//       ? analysis.score / analysis.calculation.length / SENTIMENT_RANGE
//       : 0;
//   return sentiment;
// };
