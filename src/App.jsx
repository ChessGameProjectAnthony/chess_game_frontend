import Gameboard from './components/Gameboard'
import { GameboardProvider } from './context/GameboardContextProvider'

function App() {

  return (
    <>
      <GameboardProvider>
        <Gameboard />
      </GameboardProvider>
    </>
  )
}

export default App
