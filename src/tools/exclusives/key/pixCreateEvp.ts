import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixCreateEvpBody, PixCreateEvpParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixCreateEvpTool = {
  name: TOOLS_CONFIG.pixCreateEvp.name,
  description: TOOLS_CONFIG.pixCreateEvp.description,
  parameters: {
    params: z.object({}).describe('Objeto vazio').default({}),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixCreateEvpParams;
    body: PixCreateEvpBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixCreateEvp();

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
