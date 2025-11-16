import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Initialize a default AI instance for initial app load.
// This will be reconfigured on-the-fly by actions that need an API key.
export const ai = genkit({
  plugins: [],
  model: 'googleai/gemini-2.5-flash',
});
