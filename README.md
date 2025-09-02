# Polycraft Backend

A Node.js backend API server that provides integration with Amazon Bedrock Agent, designed for the Polycraft project.

## Features

- 🚀 Express.js server with CORS enabled
- 🤖 Amazon Bedrock Agent integration
- 📝 RESTful API endpoints
- 🔐 Environment-based configuration
- 🧪 Easy testing with Postman
- 🐙 Ready for GitHub deployment

## Prerequisites

- Node.js (v16 or higher)
- AWS Account with Bedrock access
- Amazon Bedrock Agent created and configured
- AWS credentials with appropriate permissions

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd polycraft-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your AWS credentials:
   ```env
   AWS_ACCESS_KEY_ID=your_actual_access_key
   AWS_SECRET_ACCESS_KEY=your_actual_secret_key
   AWS_REGION=us-east-1
   AGENT_ALIAS_ID=your_agent_alias_id
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Invoke Bedrock Agent
- **POST** `/invoke-agent`
- **Body:**
  ```json
  {
    "agentId": "your_agent_id",
    "inputText": "Hello, how can you help me?",
    "sessionId": "optional_session_id"
  }
  ```

### Get Agent Info
- **GET** `/agent/:agentId`
- Returns basic agent information

## Testing with Postman

### 1. Health Check
- **Method:** GET
- **URL:** `http://localhost:3000/health`
- **Headers:** None required

### 2. Invoke Agent
- **Method:** POST
- **URL:** `http://localhost:3000/invoke-agent`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "agentId": "your_agent_id_here",
    "inputText": "What is the weather like today?",
    "sessionId": "test-session-123"
  }
  ```

### 3. Get Agent Info
- **Method:** GET
- **URL:** `http://localhost:3000/agent/your_agent_id_here`
- **Headers:** None required

## AWS Permissions Required

Your AWS credentials need the following permissions:
- `bedrock:InvokeAgent`
- `bedrock:InvokeModel` (if using base models)
- `iam:PassRole` (if using IAM roles)

## GitHub Setup

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Polycraft Backend API"
   ```

2. **Add remote origin**:
   ```bash
   git remote add origin <your-github-repo-url>
   ```

3. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Troubleshooting

### Common Issues

1. **AWS Credentials Error**
   - Verify your `.env` file has correct credentials
   - Ensure credentials have proper permissions

2. **Agent Not Found**
   - Verify your `agentId` is correct
   - Check if the agent is in the specified region

3. **CORS Issues**
   - The server includes CORS middleware
   - If testing from a browser, ensure the origin is allowed

4. **Port Already in Use**
   - Change the `PORT` in your `.env` file
   - Or kill the process using the port

## Project Structure

```
polycraft-backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── env.example            # Environment variables template
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── postman_collection.json # Postman collection
└── .env                   # Your environment variables (create this)
```

## Development

- **Start server:** `npm start`
- **Development mode:** `npm run dev`
- **Install new dependencies:** `npm install package-name`

## License

MIT 