import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>(["test", "a", "b", "c"])
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const submitMessage = () => {
    // your code here
  }

  const deleteMessage = () => {
    // your code here
  }

  const moveMessageUp = () => {
    // your code here
  }

  const moveMessageDown = () => {
    // your code here
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
