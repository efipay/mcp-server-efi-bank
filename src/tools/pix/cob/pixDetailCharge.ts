import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixDetailChargeBody, PixDetailChargeParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixDetailChargeTool = {
  name: TOOLS_CONFIG.pixDetailCharge.name,
  description: TOOLS_CONFIG.pixDetailCharge.description,
  parameters: {
    params: z
      .object({
        txid: z
          .string()
          .regex(/^[a-zA-Z0-9]{26,35}$/)
          .describe(
            'Cada transação Pix possui um Identificador da Transação, chamado txid, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora. Um txid válido, deve obedecer à seguinte expressão regular (regex): ^[a-zA-Z0-9]{26,35}$',
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
    params: PixDetailChargeParams;
    body: PixDetailChargeBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixDetailCharge(params);

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
