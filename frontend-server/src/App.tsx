import { useState, useEffect } from 'react'
import './App.css'

// Define the Message type matching the backend response
type Message = {
  id: number
  content: string
  order: number
}

function App() {
  // State for list of messages
  const [messages, setMessages] = useState<Message[]>([])
  // State for new message input
  const [message, setMessage] = useState<string>("")
  // State for input error handling
  const [error, setError] = useState<boolean>(false)

  // Fetch initial messages when component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/messages")
      .then(res => res.json())
      .then(data => setMessages(data))
  }, [])

  // Handle submitting a new message
  const submitMessage = async () => {
    // Validate non-empty input
    if (message.trim() === "") {
      setError(true)
      return
    }
    setError(false)

    // Send POST request to create new message
    const res = await fetch("http://127.0.0.1:8000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message })
    })

    const newMessage = await res.json()

    // Update local state with new message
    setMessages(prev => [...prev, newMessage])
    setMessage("")
  }

  // Handle deleting a message
  const deleteMessage = async (id: number) => {
    // Send DELETE request for message
    await fetch(`http://127.0.0.1:8000/messages/${id}`, {
      method: "DELETE"
    })

    // Re-fetch updated messages list after deletion
    const res = await fetch("http://127.0.0.1:8000/messages")
    const updated = await res.json()
    setMessages(updated)
  }
  /**
   * Helper function to move a message up or down in the list.
   * Swaps the message with its neighbor, reassigns correct order values,
   * and syncs the updated order with the backend API.
   *
   * @param index - The index of the message to move
   * @param direction - "up" to move the message up, "down" to move it down
   */
  const moveMessage = async (index: number, direction: "up" | "down") => {
    const updated = [...messages]
  
    if (direction === "up") {
      if (index === 0) return // Already at top
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    }
  
    if (direction === "down") {
      if (index === updated.length - 1) return // Already at bottom
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    }
  
    // Reassign all orders to ensure consistent sequence
    // In production, this could be optimized with a bulk reorder API
    for (let i = 0; i < updated.length; i++) {
      await fetch(`http://127.0.0.1:8000/messages/${updated[i].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: updated[i].content,
          order: i
        })
      })
    }
  
    setMessages(updated)
  }
  
  // Handle moving a message up in the list
  const moveMessageUp = async (index: number) => {
    await moveMessage(index, "up")
  }

  // Handle moving a message down in the list
  const moveMessageDown = async (index: number) => {
    await moveMessage(index, "down")
  }

  return (
    <div className="container">
      <div className="messages">
        <h3>Messages</h3>
        <ol>
          {messages.map((msg, index) => (
            <li className="message" key={msg.id}>
              <div className="button-group">
                <button onClick={() => deleteMessage(msg.id)}>❌</button>
                <div className="button-column-group">
                  <button onClick={() => moveMessageUp(index)}>🔼</button>
                  <button onClick={() => moveMessageDown(index)}>🔽</button>
                </div>
              </div>
              {msg.content}
            </li>
          ))}
        </ol>
      </div>

      <div className="form">
        <h3>Submit a new message</h3>
        <div className="input-group">
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={submitMessage}>submit</button>
          <p style={{ color: "hotPink", visibility: error ? "visible" : "hidden" }}>
            Message can not be empty
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
