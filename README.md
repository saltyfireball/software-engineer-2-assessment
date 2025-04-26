# Introduction
This is a take-home assessment for a software engineer (L2) candidate. It is intended as an opportunity to demonstrate a candidate's programming and design skills.

Create a fork of this repository under your account. When you are finished, invite `reeleese` and `burtus-aurelius` as collaborators.

### The Development Environment
Provided for you are devcontainer configuration files. It is recommended that you use the devcontainer for maximum compatibility. To get started with devcontainers in VSCode, check out [Microsoft's guide](https://code.visualstudio.com/docs/devcontainers/containers).

That said, it is not a requirement to use a devcontainer. One of the reasons that this is a take home assessment is to allow you to use your own tools.


### How to run the frontend server
1. Navigate to the `frontend-server` directory.
2. Run the command `npm install` to install the required dependencies.
3. Run the command `npm start` to start the web server
4. Navigate to `localhost:3000` in your web browser. (Note: if you cannot see the webpage here, and you are running windows, you need to add an entry to your hosts file to map 127.0.0.1 to localhost)

# Software Requirements

### Python API Server
You will create an API server using python. You may import any packages you desire from pip and you may use any data storage method you desire. The requirements for the API server are as follows:

1. Create a folder called "api-server" that contains a python webserver running at 127.0.0.1:8000. You will need to implement the following actions/endpoints.
```
GET    127.0.0.1:8000/messages                // Return a list of all messages
POST   127.0.0.1:8000/messages                // Create a new message
DELETE 127.0.0.1:8000/messages/:message_id    // Delete an existing message
PUT    127.0.0.1:8000/messages/:message_id    // Update an existing message
```

2. Include a local database solution such as sqlite3 to store messages. You may use any libraries you like such as django, fastapi, etc.

3. Provide a requirements.txt file. Using a virtual environment during development is highly recommended.

4. Provide instructions for how to start the api server.


### Frontend Server
The frontend server render and styling is provided for you. You will need to handle api server queries and state management.

1. You will implement message creation, order modification, and deletion. Stubs have been left in App.tsx for you.

2. The state of messages is synced with the database such that updates to the messages are preserved after page refreshes.

3. If you really really want to style the frontend, you may. But it is not a requirement by any means.


# Documentation Requirements
1. Please comment your code.
---
# Candidate Submission Notes

## Implementation Overview

- **Backend**: Implemented with FastAPI and SQLite, using SQLAlchemy ORM for database management.
- **Frontend**: Integrated with React using `fetch` for API communication.
- **State Management**: Message creation, deletion, and reordering are fully implemented and kept in sync with the API.
- **Persistence**: Message order is preserved across page refreshes by syncing with the backend database.

---

## How to Run the Project

### Install Dependencies

If using the provided DevContainer setup, backend dependencies will be installed automatically via the `postCreateCommand` defined in `.devcontainer/devcontainer.json`:

```json
"postCreateCommand": "pip install -r api-server/requirements.txt"
```

If not using DevContainers, install the dependencies manually:

```bash
cd api-server
pip install -r requirements.txt
```

---

### Running the API Server

Start the FastAPI server locally:

```bash
cd api-server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Once running, the API will be available at `http://127.0.0.1:8000/`.  
You can explore it interactively via Swagger UI at `http://127.0.0.1:8000/docs`.

---

### One-Command Start (Optional)

To run both the frontend and backend simultaneously:

#### Mac/Linux/DevContainer:

```bash
chmod +x start-dev.sh
./start-dev.sh
```

#### Windows:

```cmd
start-dev.bat
```

---

## Additional Notes

- All code is commented to clarify functionality and design decisions.
- Reordering messages currently uses multiple sequential `PUT` requests. In a production scenario, this could be optimized using a bulk reorder endpoint.

### Example bulk order main.py
```python
# Example to bulk reorder the messages
@app.put("/messages/reorder")
def reorder_messages(message_list: List[MessageReorder]):
    db = SessionLocal()
    for item in message_list:
        msg = db.query(Message).filter(Message.id == item.id).first()
        if msg:
            msg.order = item.order
    db.commit()
    db.close()
    return {"detail": "Messages reordered successfully"}
```

### Example Bulk order App.tsx
```typescript
  const moveMessage = async (index: number, direction: "up" | "down") => {
    const updated = [...messages]

    if (direction === "up") {
      if (index === 0) return
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    }

    if (direction === "down") {
      if (index === updated.length - 1) return
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    }

    // Reassign local order numbers
    const reordered = updated.map((msg, idx) => ({
      id: msg.id,
      order: idx
    }))

    // Send bulk reorder request
    await fetch("http://127.0.0.1:8000/messages/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reordered)
    })

    setMessages(updated)
  }
```