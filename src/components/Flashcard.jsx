import './Flashcard.css';
import { useState } from 'react'; 


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
    

    // State whether the card is the front or back
    const [isFront, setIsFront] = useState(true);

    // For grabbing an element in the array
    const randNum = Math.floor(Math.random() * 11);
    const [randomNumber, setRandomNumber] = useState(randNum);

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
    const flipCard = () => {
        // Use the setter to switch the card to the opposite state. Ternary operator used in the return statement when rendering that does the change of the actual flashcard
        setIsFront(!isFront);
    }


    return (
        <div className='Flashcard' onClick={flipCard}>
            {isFront ? (
                <h4 className='Question'>{getQuestion()}</h4>
            ) : (
                <h4 className='Answer'>{getAnswer()}</h4>
            )}
        </div>
    )
}

export default Flashcard;