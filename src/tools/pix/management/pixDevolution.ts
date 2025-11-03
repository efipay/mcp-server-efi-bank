import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixDevolutionBody, PixDevolutionParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixDevolutionTool = {
  name: TOOLS_CONFIG.pixDevolution.name,
  description: TOOLS_CONFIG.pixDevolution.description,
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

    body: z
      .object({
        valor: z
          .string()
          .regex(new RegExp('\d{1,10}\.\d{2}'))
          .describe(
            'Valor solicitado para devolução. A soma dos valores de todas as devolucões não podem ultrapassar o valor total do Pix. R$ 1,00 deverá ser enviado como 1.00',
          ),
      })
      .describe('Corpo da requisição HTTP'),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixDevolutionParams;
    body: PixDevolutionBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixDevolution(params);

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
