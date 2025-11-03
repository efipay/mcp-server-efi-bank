import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixDetailWebhookBody, PixDetailWebhookParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixDetailWebhookTool = {
  name: TOOLS_CONFIG.pixDetailWebhook.name,
  description: TOOLS_CONFIG.pixDetailWebhook.description,
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

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixDetailWebhookParams;
    body: PixDetailWebhookBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixDetailWebhook(params);

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
