import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixListWebhookBody, PixListWebhookParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixListWebhookTool = {
  name: TOOLS_CONFIG.pixListWebhook.name,
  description: TOOLS_CONFIG.pixListWebhook.description,
  parameters: {
    params: z
      .object({
        inicio: z
          .string()
          .describe(
            'Filtra os registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.',
          ),

        fim: z
          .string()
          .describe(
            'Filtra os registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.',
          ),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixListWebhookParams;
    body: PixListWebhookBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixListWebhook(params);

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
