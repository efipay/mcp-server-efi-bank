import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixReceivedListBody, PixReceivedListParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixReceivedListTool = {
  name: TOOLS_CONFIG.pixReceivedList.name,
  description: TOOLS_CONFIG.pixReceivedList.description,
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

        txid: z
          .string()
          .regex(new RegExp('^[a-zA-Z0-9]{26,35}$'))
          .describe(
            'Cada transação Pix possui um Identificador da Transação, chamado txid, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora. Um txid válido, deve obedecer à seguinte expressão regular (regex): ^[a-zA-Z0-9]{26,35}$',
          )
          .optional(),

        txidPresente: z
          .boolean()
          .optional()
          .describe('Filtra os Pix recebidos que têm ou não txid associadas'),

        devolucaoPresente: z
          .boolean()
          .optional()
          .describe('Filtra os Pix recebidos que têm ou não devoluções associadas'),

        exibirCodigoBanco: z
          .boolean()
          .optional()
          .describe(
            'Indica se deverá ser trazido na resposta os dados do código bancário ISPB do pagador',
          ),

        cpf: z
          .string()
          .regex(new RegExp('^\d{11}$'))
          .describe(
            'Filtro pelo CPF do recebedor. Não pode ser utilizado ao mesmo tempo que o CNPJ.',
          )
          .optional(),

        cnpj: z
          .string()
          .regex(new RegExp('^\d{14}$'))
          .describe(
            'Filtro pelo CNPJ do recebedor. Não pode ser utilizado ao mesmo tempo que o CPF.',
          )
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
    params: PixReceivedListParams;
    body: PixReceivedListBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixReceivedList(params);

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
