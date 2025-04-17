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

2. Include a local database solution such as sqlite3 to store messages.


### Frontend Server
The frontend server is provided for you. It includes requests to the endpoints required by the API server already. You should not need to make any changes to any files within the "frontend-server" folder.


# Documentation Requirements
1. The API server's code is well documented. Each function should include a docstring. Comments are included where necessary.

2. Include in your solution a markdown file titled "REPORT.md" detailing the following:
    1. How could you test this product?
    2. What would you do differently, given more time and/or resources?