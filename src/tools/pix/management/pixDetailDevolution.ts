import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixDetailDevolutionBody, PixDetailDevolutionParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixDetailDevolutionTool = {
  name: TOOLS_CONFIG.pixDetailDevolution.name,
  description: TOOLS_CONFIG.pixDetailDevolution.description,
  parameters: {
    params: z
      .object({
        e2eId: z
          .string()
          .regex(
            new RegExp(
              '^([E])([0-9]{8})([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(2[0-3]|[01][0-9])([0-5][0-9])([a-zA-Z0-9]{11})$',
            ),
          )
          .describe(
            'O e2eid é um identificador único, gerado pelo Banco Central do Brasil (BACEN), que acompanha cada transação PIX, desde o momento em que é iniciada até ser concluída.',
          ),
        id: z
          .string()
          .describe('Id gerado pelo cliente para representar unicamente uma devolução.'),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixDetailDevolutionParams;
    body: PixDetailDevolutionBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixDetailDevolution(params);

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
