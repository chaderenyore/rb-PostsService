const { bannedWords } = require("./BannedWords");

exports.filterBannedWords =  (title, body) => {
  let error = false;
  let message = "";
  const BannedWords =  bannedWords();
  console.log("Banned words", BannedWords);
  console.log("Banned words", BannedWords.length);
  // store body text and tile in an array
  const titleArray = title.split(" ");
  const bodyArray = body.split(" ");
  for(let i = 0; i < BannedWords.length; i++){
    console.log(BannedWords[i]);
    console.log(
      "TITLE ARRAY INCLUDES BANNED WORDS ================= ",
      titleArray.includes(BannedWords[i])
    );
    console.log(
      "BODY ARRAY INCLUDES BANNED WORDS ================= ",
      bodyArray.includes(BannedWords[i])
    );
    if (titleArray.includes(BannedWords[i])) {
     error = true;
     message = " Banned Words Detected";
     break;
    }
    if (bodyArray.includes(BannedWords[i])) {
      error = true;
      message = " Banned Words Detected";
      break;
    }
  }
  return {
    error,
    message,
  };
};
