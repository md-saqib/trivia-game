import React from 'react'
import MainGame from './MainGame'

const App = (props) => {
  return (
    <div className="container text-center pt-4">
      <h1 className="display-2 text-success"><u>Trivia Game</u></h1>
      <MainGame />
    </div>
  )
}

export default App
