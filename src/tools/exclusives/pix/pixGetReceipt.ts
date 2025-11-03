import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixGetReceiptBody, PixGetReceiptParams } from '../../../types/apis/index.js';
import {
  McpImageContent,
  McpResourceContent,
  McpResponse,
  McpTextContent,
} from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixGetReceiptTool = {
  name: TOOLS_CONFIG.pixGetReceipt.name,
  description: TOOLS_CONFIG.pixGetReceipt.description,
  parameters: {
    params: z
      .object({
        e2eid: z
          .string()
          .regex(
            new RegExp(
              '^([E])([0-9]{8})([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(2[0-3]|[01][0-9])([0-5][0-9])([a-zA-Z0-9]{11})$',
            ),
          )
          .describe(
            'Retorna o comprovante de um Pix enviado ou recebido, pelo endToEndId. Segue a Regex ^([E])([0-9]{8})([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(2[0-3]|[01][0-9])([0-5][0-9])([a-zA-Z0-9]{11})$',
          )
          .optional(),
        idEnvio: z
          .string()
          .regex(new RegExp('^[a-zA-Z0-9]{1,35}$'))
          .describe('Retorna o comprovante de um Pix enviado, à partir de seu id de envio.')
          .optional(),
        rtrId: z
          .string()
          .regex(new RegExp('^[a-zA-Z0-9]{32}$'))
          .describe(
            'Retorna o comprovante de uma devolução, à partir de seu id de devolução (rtrId).',
          )
          .optional(),
        txid: z
          .string()
          .regex(new RegExp('^[a-zA-Z0-9]{26,35}$'))
          .describe('Retorna o comprovante de um Pix, à partir de seu txid.')
          .optional(),
      })
      .describe('Parametros da requisição HTTP'),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixGetReceiptParams;
    body: PixGetReceiptBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixGetReceipt(params);

      const content: McpResourceContent = {
        type: 'resource',
        resource: {
          uri: `memory://comprovante-${Date.now()}`,
          blob: result.toString('base64'),
          mimeType: 'application/pdf',
        },
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
