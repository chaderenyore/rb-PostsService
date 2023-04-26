const { bannedWords } = require("./BannedWords");

exports.filterBannedWords =  (title, body) => {
  let error = false;
  let message = "";
  const BannedWords =  bannedWords();
  // store body text and tile in an array
 let titleArray;
  if(title){
    titleArray = title.split(" ");
  }
  const bodyArray = body.split(" ");
  for(let i = 0; i < BannedWords.length; i++){
   if (title && titleArray.includes(BannedWords[i])) {
     error = true;
     message = "Banned Words Detected";
     break;
    }
    if (bodyArray.includes(BannedWords[i])) {
      error = true;
      message = "Banned Words Detected";
      break;
    }
  }
  return {
    error,
    message,
  };
};
