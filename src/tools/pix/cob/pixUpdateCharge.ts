import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixUpdateChargeBody, PixUpdateChargeParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixUpdateChargeTool = {
  name: TOOLS_CONFIG.pixUpdateCharge.name,
  description: TOOLS_CONFIG.pixUpdateCharge.description,
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

    body: z
      .object({
        calendario: z
          .object({
            expiracao: z.number().describe('Tempo de expiração da cobrança em segundos'),
          })
          .strict()
          .optional(),

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
            original: z
              .string()
              .describe(
                "Valor da cobrança no formato decimal (ex: R$ 1.000,00 deve ser enviado como '1000.00')",
              ),
          })
          .strict()
          .optional(),

        chave: z.string().describe('Chave Pix do recebedor').optional(),

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
    params: PixUpdateChargeParams;
    body: PixUpdateChargeBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixUpdateCharge(params);

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
