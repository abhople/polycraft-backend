import express from 'express';
import cors from 'cors';
import { BedrockAgentRuntimeClient, InvokeAgentCommand } from '@aws-sdk/client-bedrock-agent-runtime';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Bedrock Agent Runtime client
const bedrockAgentClient = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bedrock Agent API is running' });
});

// Endpoint to invoke Bedrock Agent
app.post('/invoke-agent', async (req, res) => {
  try {
    const { agentId, inputText, sessionId } = req.body;

    if (!agentId || !inputText) {
      return res.status(400).json({
        error: 'Missing required parameters: agentId and inputText are required'
      });
    }

    const command = new InvokeAgentCommand({
      agentId: agentId,
      agentAliasId: process.env.AGENT_ALIAS_ID || 'TSTALIASID',
      sessionId: sessionId || `session-${Date.now()}`,
      inputText: inputText
    });

    console.log('Invoking Bedrock Agent with:', {
      agentId,
      agentAliasId: process.env.AGENT_ALIAS_ID,
      sessionId: sessionId || `session-${Date.now()}`,
      inputText
    });

    const response = await bedrockAgentClient.send(command);
    
    // Process the response
    let responseText = '';
    for await (const chunk of response.completion) {
      if (chunk.chunk?.bytes) {
        const chunkText = new TextDecoder().decode(chunk.chunk.bytes);
        responseText += chunkText;
      }
    }

    res.json({
      success: true,
      response: responseText,
      sessionId: response.sessionId,
      requestId: response.requestId
    });

  } catch (error) {
    console.error('Error invoking Bedrock Agent:', error);
    res.status(500).json({
      error: 'Failed to invoke Bedrock Agent',
      details: error.message
    });
  }
});

// Endpoint to get agent information
app.get('/agent/:agentId', async (req, res) => {
  try {
    const { agentId } = req.params;
    
    // This is a simple endpoint to return agent info
    // You can extend this to call Bedrock APIs to get actual agent details
    res.json({
      agentId: agentId,
      status: 'active',
      region: process.env.AWS_REGION || 'us-east-1'
    });
  } catch (error) {
    console.error('Error getting agent info:', error);
    res.status(500).json({
      error: 'Failed to get agent information',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bedrock Agent API server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Invoke agent: POST http://localhost:${PORT}/invoke-agent`);
}); 