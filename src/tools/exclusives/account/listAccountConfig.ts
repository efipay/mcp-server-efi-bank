import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { ListAccountConfigBody, ListAccountConfigParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const listAccountConfigTool = {
  name: TOOLS_CONFIG.listAccountConfig.name,
  description: TOOLS_CONFIG.listAccountConfig.description,
  parameters: {
    params: z.object({}).describe('Objeto vazio').default({}),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: ListAccountConfigParams;
    body: ListAccountConfigBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.listAccountConfig();

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
