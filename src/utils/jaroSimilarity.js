import { max } from './max';

export function jaroSimilarity(s1, s2) {
    // calculate matching window
    var matchingWindow = (max(s1.length,s2.length)/2) - 1;

    // error testing
    console.log("matching window: " + matchingWindow);
    console.log("input value: " + s2);
    console.log("answer: " + s1);

    // find matching characters
    var matchingCharacters = 0;
    var s1MatchedArray = [];
    var s2MatchedArray = [];

    // loop over the correct answer
    for (let i = 0; i < s1.length; i++) {
        var j = i - matchingWindow;
        var upperIndex = i + matchingWindow;
        if (j < 0) {
            j = 0;
        } else if (i + matchingWindow > s2.length) {
            upperIndex = s2.length - 1;
        }
        for (j; j <= upperIndex; j++) {
            if (j < 0 || j > s2.length) {
                continue;
            } else if (s1[i] == s2[j]) {
                matchingCharacters += 1;
                // add the characters to their respective arrays in the order in which they came
                s1MatchedArray.splice(i, 0, s1[i]);
                s2MatchedArray.splice(j, 0, s2[j]);
                break;
            }
        }
    }

    // count transpositions
    var numberIndexesToBeChanged = 0;
    var transpositions = 0;
    for (let i = 0; i < s1MatchedArray.length; i++) {
        if (s2MatchedArray=[i] != s1MatchedArray[i]) {
            numberIndexesToBeChanged += 1;
        }
    }
    if (numberIndexesToBeChanged > 0) {
        transpositions = Math.ceil(numberIndexesToBeChanged / 2);
    }

    // calculate jaro similarity: J = 1/3 * ( m/s1 + m/s2 + (m-t)/m )
    var sim = 0;
    if (matchingCharacters != 0) {
        sim = 1/3 * ( (matchingCharacters/s1.length) + (matchingCharacters/s2.length) + ((matchingCharacters - transpositions)/matchingCharacters) );
    }

    // error testing
    console.log("indexes to be changed: " + numberIndexesToBeChanged);
    console.log("transpositions: " + transpositions);
    console.log("matching characters: " + matchingCharacters);
    return sim;
}