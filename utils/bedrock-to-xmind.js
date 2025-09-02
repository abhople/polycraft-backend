import fs from 'fs';
import path from 'path';
import {
  Workbook,
  RootTopic,
  Topic,
  writeLocalFile
} from 'xmind-generator';

/**
 * Convert tab-indented text from Bedrock to XMind structure
 * @param {string} text - Tab-indented text from Bedrock
 * @returns {Object} - Object with root title and children structure
 */
function parseTabIndentedToStructure(text) {
  const lines = text.trim().split('\n');
  const stack = [];
  let rootTitle = '';
  let rootChildren = [];

  for (const line of lines) {
    const level = line.match(/^\t*/)[0].length; // count tabs
    const title = line.trim();
    
    if (level === 0) {
      // Root level
      rootTitle = title;
      stack.length = 0;
      stack.push({ level: 0, children: rootChildren });
    } else {
      // Child level
      const child = { title, children: [] };
      
      // Find the correct parent level
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      
      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.children.push(child);
      }
      
      stack.push({ level: level, children: child.children });
    }
  }

  return { title: rootTitle, children: rootChildren };
}

/**
 * Build XMind topics recursively using the builder pattern
 * @param {Object} node - Node with title and children
 * @returns {Topic|RootTopic} - Built topic
 */
function buildTopic(node, isRoot = false) {
  if (isRoot) {
    let rootTopic = RootTopic(node.title);
    if (node.children && node.children.length > 0) {
      const childTopics = node.children.map(child => buildTopic(child));
      rootTopic = rootTopic.children(childTopics);
    }
    return rootTopic;
  } else {
    let topic = Topic(node.title);
    if (node.children && node.children.length > 0) {
      const childTopics = node.children.map(child => buildTopic(child));
      topic = topic.children(childTopics);
    }
    return topic;
  }
}

/**
 * Generate XMind file from Bedrock output
 * @param {string} bedrockOutput - Tab-indented text from Bedrock
 * @param {string} outputPath - Path where to save the XMind file
 * @returns {Promise<string>} - Path where the file was saved
 */
export async function generateXMindFromBedrock(bedrockOutput, outputPath = null) {
  try {
    // Parse the Bedrock output to structure
    const structure = parseTabIndentedToStructure(bedrockOutput);
    
    // Build XMind topics using the builder pattern
    const rootTopic = buildTopic(structure, true);
    
    // Build XMind Workbook
    const workbook = Workbook(rootTopic);
    
    // Set default output path if none provided
    if (!outputPath) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      outputPath = path.resolve(`./bedrock-output-${timestamp}.xmind`);
    }
    
    // Save XMind file locally
    await writeLocalFile(workbook, outputPath);
    
    console.log(`✅ XMind file generated at: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('❌ Error generating XMind file:', error);
    throw error;
  }
}

/**
 * Example usage function
 */
export function exampleUsage() {
  const bedrockOutput = `
BusinessPropertyInsurance
	Coverage
		Rule: FireCoverage
		Rule: FloodCoverage
	Exclusions
		Condition: WearAndTearExcluded
	Limits
		Limit: MaxPayoutPerLocation_50000000
	Conditions
		Condition: FireSuppressionRequired
`;

  // Generate XMind file
  generateXMindFromBedrock(bedrockOutput, './BusinessPropertyInsurance.xmind')
    .then(outputPath => {
      console.log(`File saved to: ${outputPath}`);
    })
    .catch(error => {
      console.error('Failed to generate XMind file:', error);
    });
}

// Run example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exampleUsage();
} 