import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixDeleteEvpBody, PixDeleteEvpParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixDeleteEvpTool = {
  name: TOOLS_CONFIG.pixDeleteEvp.name,
  description: TOOLS_CONFIG.pixDeleteEvp.description,
  parameters: {
    params: z
      .object({
        chave: z
          .string()
          .max(77)
          .describe('O campo chave determina a chave Pix aleatória (evp) que será apagada.'),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixDeleteEvpParams;
    body: PixDeleteEvpBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixDeleteEvp(params);

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
