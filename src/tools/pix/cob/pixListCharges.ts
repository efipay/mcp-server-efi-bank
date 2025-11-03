import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixListChargesBody, PixListChargesParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixListChargesTool = {
  name: TOOLS_CONFIG.pixListCharges.name,
  description: TOOLS_CONFIG.pixListCharges.description,
  parameters: {
    params: z
      .object({
        inicio: z
          .string()
          .describe(
            'Filtra os registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.',
          ),

        fim: z
          .string()
          .describe(
            'Filtra os registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.',
          ),

        cpf: z
          .string()
          .describe(
            'Filtro pelo CPF (somente números) do pagador. Não pode ser utilizado ao mesmo tempo que o CNPJ.',
          )
          .optional(),

        cnpj: z
          .string()
          .describe(
            'Filtro pelo CNPJ (somente números) do pagador. Não pode ser utilizado ao mesmo tempo que o CPF.',
          )
          .optional(),

        status: z
          .enum(['ATIVA', 'CONCLUIDA', 'REMOVIDA_PELO_USUARIO_RECEBEDOR', 'REMOVIDA_PELO_PSP'])
          .describe('Filtro pelo status da cobrança.')
          .optional(),

        'paginacao.paginaAtual': z
          .number()
          .describe(
            'Página a ser retornada pela consulta. Se não for informada, o PSP assumirá que será 0.',
          )
          .optional()
          .default(0),

        'paginacao.itensPorPagina': z
          .number()
          .describe(
            'Quantidade máxima de registros retornados em cada página. Apenas a última página pode conter uma quantidade menor de registros.',
          )
          .optional()
          .default(100),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z.object({}).describe('Objeto vazio').default({}),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixListChargesParams;
    body: PixListChargesBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixListCharges(params);

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
