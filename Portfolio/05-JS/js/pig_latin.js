/*
Pig Latin
*/

function igpayAtinlay(str) {
  // TODO: Initialize the word array properly
  var wordArray = str.split(" ");  // Dividimos el string en un array de palabras
    var returnArray = [];
  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way");
      continue;
    }

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }
    var restOfWord = word.slice(beginning.length);
    returnArray.push(restOfWord + beginning + "ay");
  }
  return returnArray.join(" ");
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
