import './Flashcard.css';
import { useState } from 'react'; 
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

    // get a random number between 0-9
    const randNum = Math.floor(Math.random() * 10);

    // State variables
    const [isFront, setIsFront] = useState(true);
    const [isCorrect, setIsCorrect] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [randomNumber, setRandomNumber] = useState(randNum);

    // Form functions
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        var similarity = jaroSimilarity(getAnswer(), inputValue);
        setIsCorrect(similarity >= 0.7 ? 'correct' : 'incorrect');
        console.log("similarity: " + similarity);
    }

    // Getter functions 
    const getRandomNumber = () => {
        const randNum = Math.floor(Math.random() * 11);
        setRandomNumber(randNum);
    }
    const getQuestion = () => {
        const randomElement = flashcards[randomNumber];
        const randomQuestion = Object.keys(randomElement)[0];
        return randomQuestion;
    }
    const getAnswer = () => {
        const randomElement = flashcards[randomNumber];
        const randomAnswer = Object.values(randomElement)[0];
        return randomAnswer;
    }

    // OnClick Functions
    const flipCard = () => {
        setIsFront(!isFront);
    }
    const nextCard = () => {
        // call the random number generator and switch the state of the card to the front
        getRandomNumber();
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

            <button onClick={nextCard} className='button-nextCard'>
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
            </div>
        </div>
    )
}

export default Flashcard;