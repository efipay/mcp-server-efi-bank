import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixResendWebhookBody, PixResendWebhookParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixResendWebhookTool = {
  name: TOOLS_CONFIG.pixResendWebhook.name,
  description: TOOLS_CONFIG.pixResendWebhook.description,
  parameters: {
    params: z.object({}).describe('Objeto vazio').default({}),

    body: z
      .object({
        tipo: z
          .enum(['PIX_RECEBIDO', 'PIX_ENVIADO', 'DEVOLUCAO_RECEBIDA', 'DEVOLUCAO_ENVIADA'])
          .describe('Tipo da trasação que deseja que o evento de webhook seja reenviado.'),

        e2eids: z.array(
          z
            .string()
            .regex(
              new RegExp(
                '^([E])([0-9]{8})([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(2[0-3]|[01][0-9])([0-5][0-9])([a-zA-Z0-9]{11})$',
              ),
            ),
        ),
      })
      .strict()
      .describe('Corpo da requisição HTTP'),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixResendWebhookParams;
    body: PixResendWebhookBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixResendWebhook(params, body);

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
