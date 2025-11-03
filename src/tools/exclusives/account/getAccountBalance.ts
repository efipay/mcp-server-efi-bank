import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { GetAccountBalanceBody, GetAccountBalanceParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const getAccountBalanceTool = {
  name: TOOLS_CONFIG.getAccountBalance.name,
  description: TOOLS_CONFIG.getAccountBalance.description,
  parameters: {
    params: z
      .object({
        bloqueios: z
          .boolean()
          .optional()
          .describe('Possibilidade de trazer os saldos bloqueados (MED e Judicial).'),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: GetAccountBalanceParams;
    body: GetAccountBalanceBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.getAccountBalance(params);

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
