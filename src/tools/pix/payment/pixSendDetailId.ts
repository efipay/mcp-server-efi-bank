import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixSendDetailIdBody, PixSendDetailIdParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixSendDetailIdTool = {
  name: TOOLS_CONFIG.pixSendDetailId.name,
  description: TOOLS_CONFIG.pixSendDetailId.description,
  parameters: {
    params: z
      .object({
        idEnvio: z
          .string()
          .regex(/^[a-zA-Z0-9]{1,35}$/)
          .describe('O campo idEnvio determina o identificador da transação.'),
        exibirCodigoBanco: z
          .boolean()
          .optional()
          .describe(
            'Indica se deverá ser trazido na resposta os dados do código bancário ISPB do recebedor',
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
    params: PixSendDetailIdParams;
    body: PixSendDetailIdBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixSendDetailId(params);

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
