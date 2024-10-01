import './App.css';
import Flashcard from './components/Flashcard';

const App = () => {
  return (
    <div className='App'>
      <h1>Trivia Crack</h1>
      <p>Learn about biology, chemistry, history, and math</p>
      <Flashcard></Flashcard>
    </div>
  )
}

export default App;