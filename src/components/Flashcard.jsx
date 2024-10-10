import './Flashcard.css';
import { useState, useEffect } from 'react'; 
import { jaroSimilarity } from '../utils/jaroSimilarity';


const Flashcard = () => {
    const flashcards = [
        {
            "What is mitosis?":"A process of cell division resulting in two genetically identical daughter cells from a single parent cell."
        },
        {
            "What is the Pythagorean Theorem?":"A fundamental relation in geometry that states: a² + b² = c² for a right triangle, where c is the hypotenuse."
        },
        {
            "Who created the periodic table?":"The Russian chemist Dmitri Mendeleev, who organized elements by their atomic weight and properties."
        },
        {
            "What event triggered World War I?":"The assassination of Archduke Franz Ferdinand in 1914, which led to a global conflict involving many world powers."
        },
        {
            "What is osmosis?":"The movement of water molecules through a selectively permeable membrane from a region of low solute concentration to high concentration."
        },
        {
            "What is Euler's Number?":"An important mathematical constant approximately equal to 2.718, often denoted as 'e'. It is the base of natural logarithms."
        },
        {
            "What is Avogadro's Number?":"The number of atoms or molecules in one mole of a substance, equal to 6.022 x 10²³."
        },
        {
            "What was the French Revolution?":"A period of radical social and political upheaval in France (1789-1799) that led to the rise of Napoleon Bonaparte."
        },
        {
            "What is photosynthesis?":"The process by which green plants and some other organisms use sunlight to synthesize food from carbon dioxide and water."
        },
        {
            "What is the quadratic formula?":"A formula used to find the roots of a quadratic equation: (-b ± √(b²-4ac)) / 2a."
        }
    ];

    // Go back and forth between cards in a unique card set: 5 steps

    // Step 1: create 3 state variables to keep track of the indices and array generation
    const [currentIndex, setCurrentIndex] = useState(0);
    const [randomIndexArray, setRandomIndexArray] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Step 2: make a function, generateRandomIndexArra(), that creates an array of random unique indices from 0-9 of length 10
    const generateRandomIndexArray = () => {
        var validNumbers = [0,1,2,3,4,5,6,7,8,9];
        var updatedArray = [];

        for (let i = 0; i < 10; i++) {
            // Grab random index from 0 - validNumbers.length. Push the element at that index to the updatedArrray. Remove the element at that randIndex so it can't be used again, ensuring uniqueness
            var randIndex = Math.floor(Math.random() * validNumbers.length);
            updatedArray.push(validNumbers[randIndex]); 
            validNumbers.splice(randIndex, 1);

            // Debugging
            console.log("randindex: " + randIndex);
            console.log("updated array: " + updatedArray);
            console.log("validNumbers: " + validNumbers);
        }
        setRandomIndexArray(updatedArray);  
        console.log("RandomIndexArray: " + randomIndexArray);
    }

    // Step 3: useEffect to generate the random array on the first render
    useEffect(() => {
        generateRandomIndexArray();
        setIsInitialized(true);
    }, []);

    // State variables
    const [isFront, setIsFront] = useState(true);
    const [isCorrect, setIsCorrect] = useState('');
    const [inputValue, setInputValue] = useState('');

    // Form functions
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var similarity = jaroSimilarity(getAnswer(), inputValue);
        setIsCorrect(similarity >= 0.54 ? 'correct' : 'incorrect');
        console.log("similarity: " + similarity);
    }

    // Getter functions 
    const getQuestion = () => {
        if (isInitialized) {
            const randomIndex = randomIndexArray[currentIndex];
            const randomElement = flashcards[randomIndex];
            const randomQuestion = Object.keys(randomElement)[0];
            return randomQuestion;
        }
    }
    const getAnswer = () => {
        if (isInitialized) {
            const randomIndex = randomIndexArray[currentIndex];
            const randomElement = flashcards[randomIndex];
            const randomAnswer = Object.values(randomElement)[0];
            return randomAnswer;
        }
    }

    // OnClick Functions
    const flipCard = () => {
        setIsFront(!isFront);
    }
    const nextCard = () => {   // Step 4: update nextCard logic to increment the current index
        // Bounds check: make sure index doesn't go past 9
        if (currentIndex < 9) {
            setCurrentIndex(currentIndex + 1);
            setIsFront(true);
        }
    }
    const previousCard = () => {  // Step 5: make previousCard function that decrements the current index and reset the isFront to true
        // Bounds check: make sure index doesn't go lower than 0
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFront(true);
        }
    }
    const shuffleCards = () => {
        // Call the function to generate a new random index array, reset the current index to 0, make sure front is true
        generateRandomIndexArray();
        setCurrentIndex(0);
        setIsFront(true);
    }


    return (
        <div className='Container'>
            <div className='Flashcard' onClick={flipCard}>
                {isFront ? (
                    <h4 className='Question'>{getQuestion()}</h4>
                ) : (
                    <h4 className='Answer'>{getAnswer()}</h4>
                )}
            </div>
            
            <button onClick={previousCard} className='button-changeCard'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F5F5F5" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>

            </button>
            <button onClick={nextCard} className='button-changeCard'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F5F5F5" className="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
            </button>

            <div className='answer-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='guess-answer'>Guess your answer here:</h4>
                    <input 
                        type="text"
                        value={inputValue}
                        id={isCorrect}
                        onChange={handleInputChange}
                        placeholder='Type guess here...'
                    />
                    <button type='submit' className='button-guess'>Submit Guess</button>
                </form>
                <button onClick={shuffleCards} className='button-shuffle'>Shuffle Cards</button>
            </div>
        </div>
    )
}

export default Flashcard;