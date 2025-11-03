import { TOOLS_CONFIG } from '../../../config/api.js';
import { z } from 'zod';
import { PixSendBody, PixSendParams } from '../../../types/apis/index.js';
import { McpResponse, McpTextContent } from '../../../types/mcp.js';
import { EfiSDK } from '../../index.js';

export const pixSendTool = {
  name: TOOLS_CONFIG.pixSend.name,
  description: TOOLS_CONFIG.pixSend.description,
  parameters: {
    params: z
      .object({
        idEnvio: z
          .string()
          .regex(/^[a-zA-Z0-9]{1,35}$/)
          .describe(
            'O campo idEnvio determina o identificador da transação. Segue a Regex ^[a-zA-Z0-9]{1,35}$',
          ),
      })
      .strict()
      .describe('Parametros da requisição HTTP'),

    body: z
      .object({
        valor: z
          .string()
          .describe(
            'Valor do envio no formato decimal. ex: R$ 1.000,00 deve ser enviado como "1000.00"',
          ),

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

        favorecido: z.union([
          z
            .object({
              chave: z
                .string()
                .max(77)
                .describe(
                  'Determina a chave Pix registrada no DICT que será utilizada identificar o recebedor do Pix. Pode ser uma chave cadastrada em qualquer PSP.',
                ),
              cpf: z
                .string()
                .describe(
                  'CPF do recebedor, apenas números. Caso a chave enviada tenha um titular com CPF diferente do informado aqui o envio não será concluido.',
                )
                .optional(),
            })
            .strict(),
          z
            .object({
              chave: z
                .string()
                .max(77)
                .describe(
                  'Determina a chave Pix registrada no DICT que será utilizada identificar o recebedor do Pix. Pode ser uma chave cadastrada em qualquer PSP.',
                ),
              cnpj: z
                .string()
                .describe(
                  'CNPJ do recebedor, apenas números. Caso a chave enviada tenha um titular com CNPJ diferente do informado aqui o envio não será concluido.',
                )
                .optional(),
            })
            .strict(),
          z
            .object({
              contaBanco: z.object({
                nome: z.string().describe('Nome do recebdor').max(199),
                codigoBanco: z
                  .string()
                  .regex(/^\d{8}$/)
                  .describe(
                    'ISPB do Banco do recebedor, ver lista em https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.pdf',
                  ),
                agencia: z
                  .string()
                  .regex(/^\d{1,4}$/)
                  .describe('Agência do recebedor no seu Banco, sem o dígito verificador.'),
                conta: z
                  .string()
                  .regex(/^\d+$/)
                  .describe('Conta do recebedor no seu Banco com o dígito verificador, sem traço.'),
                tipoConta: z
                  .enum(['cacc', 'svgs', 'tran'])
                  .describe(
                    'cacc = Conta Corrente; svgs = Conta Poupança; tran = Conta Transacional.',
                  ),
                cpf: z.string().describe('CPF do recebedor (somente números).'),
              }),
            })
            .strict(),
          z
            .object({
              contaBanco: z.object({
                nome: z.string().describe('Nome do recebdor').max(199),
                codigoBanco: z
                  .string()
                  .regex(/^\d{8}$/)
                  .describe(
                    'ISPB do Banco do recebedor, ver lista em https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.pdf',
                  ),
                agencia: z
                  .string()
                  .regex(/^\d{1,4}$/)
                  .describe(
                    'Agência do recebedor no seu Banco, sem o dígito verificador. Segue a Regex ',
                  ),
                conta: z
                  .string()
                  .regex(/^\d+/)
                  .describe('Conta do recebedor no seu Banco com o dígito verificador, sem traço'),
                tipoConta: z
                  .enum(['cacc', 'svgs', 'tran'])
                  .describe(
                    'cacc = Conta Corrente; svgs = Conta Poupança; tran = Conta Transacional.',
                  ),
                cnpj: z.string().describe('CNPJ do recebedor. Somente números'),
              }),
            })
            .strict(),
        ]),
      })
      .strict()
      .describe('Corpo da requisição HTTP'),
  },
  handler: async ({
    params,
    body,
  }: {
    params: PixSendParams;
    body: PixSendBody;
  }): Promise<McpResponse> => {
    try {
      const result = await EfiSDK.pixSend(params, body);

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

// EXEMPLO PARA FUNCIONAR COM FERRAMENTAS QUE NÃO RECONHECEM CAMPOS OPCIONAIS ADEQUADAMENTE
// import { TOOLS_CONFIG } from '../../../config/api.js';
// import { z } from 'zod';
// import { PixSendBody, PixSendParams } from '../../../types/apis/index.js';
// import { McpResponse, McpTextContent } from '../../../types/index.js';
// import { EfiSDK } from '../../index.js';

// export const pixSendTool = {
//   name: TOOLS_CONFIG.pixSend.name,
//   description: TOOLS_CONFIG.pixSend.description,
//   parameters: {
//     params: z
//       .object({
//         idEnvio: z
//           .string()
//           // .regex(new RegExp('^[a-zA-Z0-9]{1,35}$'))
//           .describe(
//             'O campo idEnvio determina o identificador da transação. Segue a Regex ^[a-zA-Z0-9]{1,35}$',
//           ),
//       })
//       .strict()
//       .describe('Parametros da requisição HTTP'),

//     body: z
//       .object({
//         valor: z
//           .string()
//           .regex(/\d{1,10}\.\d{2}/)
//           .describe(
//             'Valor do envio no formato decimal. Exemplo: R$ 10,00 deve ser enviado como 10.00',
//           ),

//         pagador: z
//           .object({
//             chave: z
//               .string()
//               .max(77)
//               .describe(
//                 'Determina a chave Pix registrada no DICT que será utilizada identificar o pagador do Pix. Deve ser uma chave cadastrada na conta que esta consumindo a API, ou seja, uma conta no PSP Efí Bank',
//               ),
//             infoPagador: z.string().max(139).optional(),
//           })
//           .strict(),

//         favorecido: z
//           .object({
//             chave: z
//               .string()
//               .max(77)
//               .describe(
//                 'Chave Pix registrada no DICT para identificar o recebedor. Obrigatória quando "contaBanco" não for fornecido.',
//               )
//               .optional(),

//             cpf: z
//               .string()
//               .regex(/^\d{11}$/)
//               .describe(
//                 'CPF do recebedor, apenas números. Usado em conjunto com "chave" ou "contaBanco". Obrigatório para pessoa física.',
//               )
//               .optional(),

//             cnpj: z
//               .string()
//               .regex(/^\d{14}$/)
//               .describe(
//                 'CNPJ do recebedor, apenas números. Usado em conjunto com "chave" ou "contaBanco". Obrigatório para pessoa jurídica.',
//               )
//               .optional(),

//             contaBanco: z
//               .object({
//                 nome: z
//                   .string()
//                   .max(199)
//                   .describe(
//                     'Nome do recebedor conforme cadastrado na instituição bancária. Obrigatoriamente deve ser enviado se o objeto contaBanco for usado',
//                   )
//                   .optional(),

//                 codigoBanco: z
//                   .string()
//                   .regex(/^\d{8}$/)
//                   .describe(
//                     'ISPB do banco do recebedor. Ver lista oficial: https://www.bcb.gov.br/content/estabilidadefinanceira/str1/ParticipantesSTR.pdf. Obrigatoriamente deve ser enviado se o objeto contaBanco for usado',
//                   )
//                   .optional(),

//                 agencia: z
//                   .string()
//                   .regex(/^\d{1,4}$/)
//                   .describe(
//                     'Número da agência do banco, sem dígito verificador. Obrigatoriamente deve ser enviado se o objeto contaBanco for usado',
//                   )
//                   .optional(),

//                 conta: z
//                   .string()
//                   .regex(/^\d+$/)
//                   .describe(
//                     'Número da conta com dígito verificador (sem traço). Obrigatoriamente deve ser enviado se o objeto contaBanco for usado',
//                   )
//                   .optional(),

//                 tipoConta: z
//                   .enum(['cacc', 'svgs', 'tran'])
//                   .describe(
//                     'Tipo da conta: cacc = Corrente, svgs = Poupança, tran = Transacional. Obrigatoriamente deve ser enviado se o objeto contaBanco for usado',
//                   )
//                   .optional(),

//                 cpf: z
//                   .string()
//                   .regex(/^\d{11}$/)
//                   .describe('CPF do titular da conta, obrigatório para pessoa física.')
//                   .optional(),

//                 cnpj: z
//                   .string()
//                   .regex(/^\d{14}$/)
//                   .describe('CNPJ do titular da conta, obrigatório para pessoa jurídica.')
//                   .optional(),
//               })
//               .strict()
//               .describe(
//                 'Bloco de dados bancários do recebedor. Alternativo ao uso de chave Pix. Todos os campos são obrigatórios quando este objeto é utilizado.',
//               )
//               .optional(),
//           })
//           .strict(),
//       })
//       .strict()
//       .describe('Corpo da requisição HTTP'),
//   },
//   handler: async ({
//     params,
//     body,
//   }: {
//     params: PixSendParams;
//     body: PixSendBody;
//   }): Promise<McpResponse> => {
//     try {
//       const result = await EfiSDK.pixSend(params, body);

//       const content: McpTextContent = {
//         type: 'text',
//         text: `${JSON.stringify(result, null, 2)}`,
//       };

//       return {
//         content: [content],
//       };
//     } catch (err) {
//       const content: McpTextContent = {
//         type: 'text',
//         text: `${JSON.stringify(err, null, 2)}`,
//       };

//       return {
//         content: [content],
//       };
//     }
//   },
// };
