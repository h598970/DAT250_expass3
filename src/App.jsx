import { useState } from 'react'
import './App.css'
import CreatePollComponent from "./components/poll.jsx";
import VoteComponent from "./components/vote.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="App">
          <h1>Polls App</h1>
          <CreatePollComponent/>
          <hr/>
          <VoteComponent/>
      </div>
  )
}

export default App
