import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixConfigWebhookBody, PixConfigWebhookParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixConfigWebhookTool = {
  name: TOOLS_CONFIG.pixConfigWebhook.name,
  description: TOOLS_CONFIG.pixConfigWebhook.description,
  parameters: {
    params: z
      .object({
        chave: z
          .string()
          .max(77)
          .describe(
            'O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.',
          ),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z
      .object({
        webhookUrl: z
          .string()
          .url()
          .refine((val) => val.startsWith('https://'), {
            message: 'A URL deve ter o protocolo https',
          }),
      })
      .strict()
      .describe('Corpo da requisição HTTP'),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixConfigWebhookParams;
    body: PixConfigWebhookBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixConfigWebhook(params, body);

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
