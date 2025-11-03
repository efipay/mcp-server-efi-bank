import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import {
  PixCreateImmediateChargeBody,
  PixCreateImmediateChargeParams,
} from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixCreateImmediateChargeTool = {
  name: TOOLS_CONFIG.pixCreateImmediateCharge.name,
  description: TOOLS_CONFIG.pixCreateImmediateCharge.description,
  parameters: {
    params: z.object({}).describe('Objeto vazio').default({}),

    body: z
      .object({
        calendario: z
          .object({
            expiracao: z.number().describe('Tempo de expiração da cobrança em segundos'),
          })
          .strict(),

        devedor: z
          .union([
            z
              .object({
                cpf: z.string().describe('CPF do devedor (somente números)'),
                nome: z.string().describe('Nome do devedor'),
              })
              .strict(),
            z
              .object({
                cnpj: z.string().describe('CNPJ do devedor (somente números)'),
                nome: z.string().describe('Nome do devedor'),
              })
              .strict(),
          ])
          .optional(),

        valor: z
          .object({
            original: z.string().describe("Valor da cobrança no formato decimal (ex: '10.00')"),
          })
          .strict(),

        chave: z.string().describe('Chave Pix do recebedor'),

        solicitacaoPagador: z
          .string()
          .describe('Texto exibido ao pagador solicitando informações adicionais')
          .optional(),

        loc: z
          .object({
            id: z.number().describe('ID de localização vinculada à cobrança'),
          })
          .strict()
          .optional(),

        infoAdicionais: z
          .array(
            z
              .object({
                nome: z.string().describe('Nome do campo adicional'),
                valor: z.string().describe('Valor do campo adicional'),
              })
              .strict(),
          )
          .describe('Lista de informações adicionais para exibição ao pagador')
          .optional(),
      })
      .strict()
      .describe('Corpo da requisição HTTP'),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixCreateImmediateChargeParams;
    body: PixCreateImmediateChargeBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixCreateImmediateCharge(params, body);

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
