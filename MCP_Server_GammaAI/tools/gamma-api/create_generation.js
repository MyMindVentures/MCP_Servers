/**
 * Create a Gamma generation (presentation, document, or webpage). POST /v1.0/generations
 */
import { executeRequest } from '../../lib/postmanExecutor.js';

const requestDefinition = {
  name: 'Create generation',
  request: {
    method: 'POST',
    url: { raw: '{{GAMMA_BASE_URL}}/generations', host: ['{{GAMMA_BASE_URL}}'], path: ['generations'] },
    header: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'X-API-KEY', value: '{{GAMMA_API_KEY}}' },
    ],
    body: { mode: 'raw', raw: '{{body_json}}' },
  },
};

const collectionVariables = [
  { key: 'GAMMA_BASE_URL', value: 'https://public-api.gamma.app/v1.0' },
];

const executeFunction = async ({
  inputText,
  textMode,
  format,
  themeId,
  folderIds,
  numCards,
  cardSplit,
  additionalInstructions,
} = {}) => {
  const body = { inputText: inputText ?? '' };
  if (textMode != null) body.textMode = textMode;
  if (format != null) body.format = format;
  if (themeId != null) body.themeId = themeId;
  if (folderIds != null) body.folderIds = Array.isArray(folderIds) ? folderIds : [folderIds];
  if (numCards != null) body.numCards = numCards;
  if (cardSplit != null) body.cardSplit = cardSplit;
  if (additionalInstructions != null) body.additionalInstructions = additionalInstructions;
  const body_json = JSON.stringify(body);
  return executeRequest(requestDefinition, { body_json }, collectionVariables);
};

export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'gamma_create_generation',
      description: 'Create a Gamma generation (presentation, document, or webpage) from input text.',
      parameters: {
        type: 'object',
        properties: {
          inputText: { type: 'string', description: 'Content to generate from (required)' },
          textMode: { type: 'string', description: 'generate, condense, or preserve' },
          format: { type: 'string', description: 'presentation, document, or webpage' },
          themeId: { type: 'string', description: 'Theme ID for styling' },
          folderIds: { type: 'array', items: { type: 'string' }, description: 'Folder IDs to organize into' },
          numCards: { type: 'number', description: 'Number of cards/slides' },
          cardSplit: { type: 'string', description: 'How to split content into cards' },
          additionalInstructions: { type: 'string', description: 'Extra instructions for generation' },
        },
        required: ['inputText'],
      },
    },
  },
};
