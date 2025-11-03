import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixQrCodePayBody, PixQrCodePayParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixQrCodePayTool = {
  name: TOOLS_CONFIG.pixQrCodePay.name,
  description: TOOLS_CONFIG.pixQrCodePay.description,
  parameters: {
    params: z
      .object({
        idEnvio: z
          .string()
          .regex(/^[a-zA-Z0-9]{1,35}$/)
          .describe('O campo idEnvio determina o identificador da transação.'),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z
      .object({
        pagador: z
          .object({
            chave: z
              .string()
              .max(77)
              .describe(
                'Determina a chave Pix registrada no DICT que será utilizada identificar o pagador do Pix. Deve ser uma chave cadastrada na conta que esta consumindo a API, ou seja, uma conta no PSP Efí Bank',
              ),
            infoPagador: z.string().max(139).optional(),
          })
          .strict(),

        pixCopiaECola: z
          .string()
          .describe('O campo pixCopiaECola determina o código do QR Code a ser pago.'),
      })
      .strict()
      .describe('Corpo da requisição HTTP'),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixQrCodePayParams;
    body: PixQrCodePayBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixQrCodePay(params, body);

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
