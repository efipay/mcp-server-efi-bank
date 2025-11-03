import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { MedListBody, MedListParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const medListTool = {
  name: TOOLS_CONFIG.medList.name,
  description: TOOLS_CONFIG.medList.description,
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
    params: MedListParams;
    body: MedListBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.medList(params);

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
