import { useState, useEffect } from 'react'
import './App.css'

function App() {w
  const [messages, setMessages] = useState<string[]>(["test", "a", "b", "c"])
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  // Welcome!
  // Edit the below functions to make the application functional.
  // Remember, updates to messages must be persisted across page refreshes.
  // That means syncing the order of messages, new messages, etc. with
  // the api server after every operation.
  // Finally, you should not need to make any changes to the rendering/styling
  // of the application.

  useEffect(() => {
    // Fetch the initial message list from the api server and set the messages state
  })

  const submitMessage = () => {
    // your code here
    // validate the message, update the messages state and sync with api server
  }

  const deleteMessage = () => {
    // your code here
    // delete the message and sync with the api server
  }

  const moveMessageUp = () => {
    // your code here
    // move the message up by one and sync new message order with api server
  }

  const moveMessageDown = () => {
    // your code here
    // move the message down by one and sync new message order with api server
  } 

  return (
    <div className="container">
      <div className="messages">
        <h3>Messages</h3>
        <ol>
          {messages.map(msg => (
            <li className="message" key={msg}>
              <div className="button-group">
                <button onClick={deleteMessage}>❌</button>
                <div className="button-column-group">
                  <button onClick={moveMessageUp}>🔼</button>
                  <button onClick={moveMessageDown}>🔽</button>
                </div>
              </div>
              {msg}
            </li>
          ))}
        </ol>
      </div>
      <div className="form">
        <h3>Submit a new message</h3>
        <div className="input-group">
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={submitMessage}>submit</button>
          <p style={{color: "hotPink", visibility: error? "visible": "hidden"}}>Message can not be empty</p>
        </div>
      </div>
    </div>
  )
}

export default App
