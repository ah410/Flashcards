import { max } from './max';

export function jaroSimilarity(s1, s2) {
    // Calculate matching window
    var matchingWindow = Math.floor((max(s1.length,s2.length)/2) - 1);

    // Debugging
    console.log("matching window: " + matchingWindow);
    console.log("input value: " + s2);
    console.log("answer: " + s1);

    // Find matching characters
    var matchingCharacters = 0;
    var s1MatchedArray = [];
    var s2MatchedArray = [];
    var matchedCharacterIndices = [];

    // Loop over the correct answer (s1)
    for (let i = 0; i < s1.length; i++) {
        var j = i - matchingWindow;
        var upperIndex = i + matchingWindow;

        // Bounds checking for looping over the input
        if (j < 0) {
            j = 0;
        } else if (upperIndex >= s2.length) {
            upperIndex = s2.length - 1;
        }

        // Loop over the input (s2), checking for matching characters at current index of the correct answer (s1)
        for (j; j <= upperIndex; j++) {
            if (s1[i] == s2[j] && !matchedCharacterIndices.includes(j)) {
                // Increase matching characters by 1
                matchingCharacters += 1;

                // Add the characters to their respective arrays in the order in which they came
                s1MatchedArray.splice(i, 0, s1[i]);
                s2MatchedArray.splice(j, 0, s2[j]);

                // Add the jth index to the array of matched indices so you can't use it again
                matchedCharacterIndices.push(j);
                
                // Only one matched character per ith index, so break if a match found
                break;
            }
        }
    }

    // Count transpositions
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

    // Calculate jaro similarity: J = 1/3 * ( m/|s1| + m/|s2| + (m-t)/m )
    var sim = 0;
    if (matchingCharacters != 0) {
        sim = 1/3 * ( (matchingCharacters/s1.length) + (matchingCharacters/s2.length) + ((matchingCharacters - transpositions)/matchingCharacters) );
    }

    // Debugging
    console.log("indexes to be changed: " + numberIndexesToBeChanged);
    console.log("transpositions: " + transpositions);
    console.log("matching characters: " + matchingCharacters);

    return sim;
}