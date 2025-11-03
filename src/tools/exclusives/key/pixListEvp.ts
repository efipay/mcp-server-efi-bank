import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixListEvpBody, PixListEvpParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixListEvpTool = {
  name: TOOLS_CONFIG.pixListEvp.name,
  description: TOOLS_CONFIG.pixListEvp.description,
  parameters: {
    params: z.object({}).describe('Objeto vazio').default({}),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixListEvpParams;
    body: PixListEvpBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixListEvp();

      const content: McpTextContent = {
        type: 'text',
        text: `${JSON.stringify(result, null, 2)}`,
      };

      return {
        content: [content],
      };
    } catch (err) {
      const content: McpTextContent = {
        type: 'text',
        text: `${JSON.stringify(err, null, 2)}`,
      };

      return {
        content: [content],
      };
    }
  },
};
