import { useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>(["test", "a", "b", "c"])
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const handleSubmit = () => {
    if (message === "") {
      setError(true)
    } else {
      setMessages(oldMessages => [message, ...oldMessages])
      setMessage("")
      setError(false)
    }
  }

  return (
    <div className="container">
      <div className="messages">
        <h3>Messages</h3>
        <ol>
          {messages.map(msg => (
            <li className="message" key={msg}>{msg}</li>
          ))}
        </ol>
      </div>
      <div className="form">
        <h3>Submit a new message</h3>
        <div className="input-group">
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleSubmit}>submit</button>
          <p style={{color: "hotPink", visibility: error? "visible": "hidden"}}>Message can not be empty</p>
        </div>
      </div>
    </div>
  )
}

export default App
