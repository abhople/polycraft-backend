import { generateXMindFromBedrock } from './utils/bedrock-to-xmind.js';

// Test with sample Bedrock output
const sampleBedrockOutput = `
ProjectManagement
	Planning
		Task: DefineScope
		Task: CreateTimeline
		Task: AllocateResources
	Execution
		Phase: Development
		Phase: Testing
		Phase: Deployment
	Monitoring
		Metric: ProgressTracking
		Metric: QualityAssurance
		Metric: RiskAssessment
`;

console.log('🧠 Converting Bedrock output to XMind...');
console.log('Input:');
console.log(sampleBedrockOutput);

// Generate XMind file
generateXMindFromBedrock(sampleBedrockOutput, './test-output.xmind')
  .then(outputPath => {
    console.log(`\n✅ Success! XMind file generated at: ${outputPath}`);
    console.log('You can now open this file with XMind or any compatible mind mapping software.');
  })
  .catch(error => {
    console.error('\n❌ Failed to generate XMind file:', error);
  }); 