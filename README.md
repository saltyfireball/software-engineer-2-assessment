# Introduction
This is a take-home assessment for a software engineer (L2) candidate. It is intended as an opportunity to demonstrate a candidate's programming and design skills.

### The Development Environment
Provided for you are devcontainer configuration files. It is recommended that you use the devcontainer for maximum compatibility. To get started with devcontainers in VSCode, check out [Microsoft's guide](https://code.visualstudio.com/docs/devcontainers/containers).

That said, it is not a requirement to use a devcontainer. One of the reasons that this is a take home assessment is to allow you to use your own tools.

# Software Requirements

### Python API Server
You will create an API server using python. You may import any packages you desire from pip and you may use any data storage method you desire. The requirements for the API server are as follows:

1. Create a folder called "api-server" that contains a python webserver running at 127.0.0.1:8000. Implement the following actions/endpoints.
```
GET    127.0.0.1:8000/messages                // Return a list of all messages
POST   127.0.0.1:8000/messages                // Create a new message
DELETE 127.0.0.1:8000/messages/:message_id    // Delete an existing message
PUT    127.0.0.1:8000/messages/:message_id    // Update an existing message
```

2. Include a local database solution such as sqlite3 to store messages. You may use any libraries you like such as django, fastapi, etc.

3. Please provide a requirements.txt file and build instructions. Using a virtual environment during development is highly recommended.


### Frontend Server
The frontend server render and styling is provided for you. You will need to handle database queries and state management.

1. You will implement message creation, order modification, and deletion. Stubs have been left in App.tsx for you.

2. The state of messages is synced with the database such that updates to the messages are preserved after page refreshes.

3. If you really really want to style the frontend, you may. But do 


# Documentation Requirements
1. All code written is well documented.