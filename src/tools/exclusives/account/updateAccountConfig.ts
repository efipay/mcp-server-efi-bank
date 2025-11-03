import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { UpdateAccountConfigBody, UpdateAccountConfigParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const updateAccountConfigTool = {
  name: TOOLS_CONFIG.updateAccountConfig.name,
  description: TOOLS_CONFIG.updateAccountConfig.description,
  parameters: {
    params: z.object({}).describe('Objeto vazio').default({}),

    body: z
      .object({
        pix: z
          .object({
            receberSemChave: z
              .boolean()
              .describe(
                'Define se será possível receber valores via Pix sem utilizar chave, por exemplo, por Pix via Dados Bancarios (também incluso pagamentos do Pix via Open Finance que usem dados bancários para o recebimento).',
              ),
            chaves: z
              .record(
                z.string().max(77).describe('Chave Pix a qual será aplicada as configurações'),
                z
                  .object({
                    recebimento: z
                      .object({
                        txidObrigatorio: z
                          .boolean()
                          .describe(
                            'Define a obrigatoriedade de txid nas cobranças recebidas por uma chave Pix.',
                          ),
                        recusarTipoPessoa: z
                          .enum(['PJ', 'PF'])
                          .describe(
                            'Configura a restrição de recebimento por tipo de documento, podendo ser PF (pessoa física) ou PJ (Pessoa Jurídica).',
                          )
                          .optional(),
                        qrCodeEstatico: z
                          .object({
                            recusarTodos: z
                              .boolean()
                              .describe('Configura a rejeição de todos os QR Codes estáticos.'),
                          })
                          .strict(),
                        documentoPagadorIgualDevedor: z
                          .boolean()
                          .optional()
                          .describe(
                            'Configura o bloqueio dos recebimentos de cobranças Pix, cujo documento do devedor, cadastrado no momento da criação da cobrança não coincida com o documento do pagador.',
                          ),
                        webhook: z
                          .object({
                            notificacao: z
                              .object({
                                tarifa: z
                                  .boolean()
                                  .describe(
                                    'Configura o recebimento (no webhook) ou não do valor das tarifas pagas ao receber Pix na conta Efí.',
                                  ),
                                pagador: z
                                  .boolean()
                                  .describe(
                                    'Configura o recebimento dos dados do pagador da cobrança Pix recebida, os dados retornados são: nome completo e documento.',
                                  ),
                              })
                              .strict(),
                            notificar: z
                              .object({
                                pixSemTxid: z
                                  .boolean()
                                  .describe(
                                    'Configura o recebimento ou não de notificações de cobranças Pix sem Txid.',
                                  ),
                              })
                              .optional(),
                          })
                          .optional(),
                      })
                      .strict(),
                    envio: z
                      .object({
                        webhook: z
                          .object({
                            notificacao: z
                              .object({
                                tarifa: z
                                  .boolean()
                                  .describe(
                                    'Configura o recebimento (no webhook) ou não do valor das tarifas pagas ao enviar Pix na conta Efí.',
                                  ),
                                favorecido: z
                                  .boolean()
                                  .describe(
                                    'Configura o recebimento dos dados do favorecido do Pix enviado, os dados retornados são: nome completo, documento e dados da conta.',
                                  ),
                              })
                              .strict(),
                          })
                          .strict(),
                      })
                      .strict(),
                  })
                  .strict(),
              )
              .optional(),
          })
          .strict(),
      })
      .strict()
      .describe('Corpo da requisição HTTP'),
  },
  handler: async ({
    params,
    body,
  }: {
    params: UpdateAccountConfigParams;
    body: UpdateAccountConfigBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.updateAccountConfig(params, body);

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
