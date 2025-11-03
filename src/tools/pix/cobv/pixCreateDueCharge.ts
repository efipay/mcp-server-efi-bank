// import { TOOLS_CONFIG } from '../../../config/api.js';
// import { z } from 'zod';
// import { PixCreateDueChargeBody, PixCreateDueChargeParams } from '../../../types/apis/index.js';
// import { McpResponse, McpTextContent } from '../../../types/index.js';
// import { EfiSDK } from '../../index.js';

// // EM CONSTRUÇÂO - NÂO ESTA CORRETO!!
// export const pixCreateDueChargeTool = {
//   name: TOOLS_CONFIG.pixCreateDueCharge.name,
//   description: TOOLS_CONFIG.pixCreateDueCharge.description,
//   parameters: {
//     params: z
//       .object({
//         txid: z
//           .string()
//           .regex(new RegExp('^[a-zA-Z0-9]{26,35}$'))
//           .describe(
//             'Cada transação Pix possui um Identificador da Transação, chamado txid, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora. Um txid válido, deve obedecer à seguinte expressão regular (regex): ^[a-zA-Z0-9]{26,35}$',
//           ),
//       })
//       .strict()
//       .describe('Parametros da requisição HTTP'),

//     body: z
//       .object({
//         calendario: z
//           .object({
//             expiracao: z.number().describe('Tempo de expiração da cobrança em segundos'),
//           })
//           .strict(),

//         devedor: z
//           .object({
//             cpf: z.string().describe('CPF do devedor (somente números)').optional(),
//             cnpj: z.string().describe('CNPJ do devedor (somente números)').optional(),
//             nome: z.string().describe('Nome do devedor'),
//             logradouro: z.string().describe('Logradouro do usuário pagador.').max(200).optional(),
//             cidade: z.string().describe('Cidade do usuário pagador').max(200).optional(),
//             uf: z.string().describe('UF do usuário pagador.').length(2).optional(),
//             cep: z.string().describe('CEP do usuário pagador (somente números).').max(8).optional(),
//           })
//           .describe(
//             'É preciso que obrigatoriamente seja informado CPF ou CNPJ, ou seja, ao menos um dos dois deve ser informado junto com o nome.',
//           )
//           .strict(),

//         valor: z
//           .object({
//             original: z.string().describe("Valor da cobrança no formato decimal (ex: '10.00')"),
//             multa: z
//               .object({
//                 modalidade: z
//                   .number()
//                   .int()
//                   .min(1)
//                   .max(2)
//                   .describe('Modalidade da multa:\nValor Fixo = 1\nValor Percentual = 2'),
//                 valorPerc: z
//                   .string()
//                   .regex(new RegExp('\d{1,10}\.\d{2}'))
//                   .describe(
//                     'Multa do documento em valor absoluto ou percentual. Exemplo:\nSe modalidade = 1 e valorPerc = "1.00" a multa será de R$ 1,00\n Se modalidade = 2 e valorPerc = "1.00" a multa será de 1% do valor total da cobrança.',
//                   ),
//               })
//               .strict()
//               .optional(),
//             juros: z
//               .object({
//                 modalidade: z
//                   .number()
//                   .int()
//                   .min(1)
//                   .max(8)
//                   .describe(
//                     'Modalidade do juros:\n' +
//                       'Valor (dias corridos) = 1\n' +
//                       'Percentual ao dia (dias corridos) = 2\n' +
//                       'Percentual ao mês (dias corridos) = 3\n' +
//                       'Percentual ao ano (dias corridos) = 4\n' +
//                       'Valor (dias úteis) = 5\n' +
//                       'Percentual ao dia (dias úteis) = 6\n' +
//                       'Percentual ao mês (dias úteis) = 7\n' +
//                       'Percentual ao ano (dias úteis) = 8',
//                   ),
//                 valorPerc: z
//                   .string()
//                   .regex(new RegExp('\d{1,10}\.\d{2}'))
//                   .describe(
//                     'Juros do documento, valor sempre seguirá a Regex \d{1,10}\.\d{2} mas o significado de seu valor esta atrelado ao campo modalidade, que dita como os juros serão aplicados.',
//                   ),
//               })
//               .strict()
//               .optional(),
//             abatimento: z
//               .object({
//                 modalidade: z
//                   .number()
//                   .int()
//                   .min(1)
//                   .max(2)
//                   .describe('Modalidade de abatimentos:\nValor Fixo = 1\nValor Percentual = 2'),
//                 valorPerc: z
//                   .string()
//                   .regex(new RegExp('\d{1,10}\.\d{2}'))
//                   .describe(
//                     'Abatimentos ou outras deduções aplicadas ao documento, em valor absoluto ou percentual do valor original do documento. Exemplo:\nSe modalidade = 1 e valorPerc = "1.00" o abatimento será de R$ 1,00\n Se modalidade = 2 e valorPerc = "1.00" o abatimento será de 1% do valor total da cobrança.',
//                   ),
//               })
//               .strict()
//               .optional(),
//             desconto: z
//               .object({
//                 modalidade: z
//                   .number()
//                   .int()
//                   .min(1)
//                   .max(6)
//                   .describe(
//                     'Modalidade de descontos:\n' +
//                       'Valor Fixo até a[s] data[s] informada[s] = 1\n' +
//                       'Percentual até a data informada = 2\n' +
//                       'Valor por antecipação dia corrido = 3\n' +
//                       'Valor por antecipação dia útil = 4\n' +
//                       'Percentual por antecipação dia corrido = 5\n' +
//                       'Percentual por antecipação dia útil = 6',
//                   ),
//                 descontoDataFixa: z.array(
//                   z.object({
//                     data: z.string().describe('Data no formato YYYY-MM-DD'),
//                     valorPerc: z
//                       .string()
//                       .regex(new RegExp('\d{1,10}\.\d{2}'))
//                       .describe(
//                         'Abatimentos ou outras deduções aplicadas ao documento, em valor absoluto ou percentual do valor original do documento',
//                       ),
//                   }),
//                 ),
//               })
//               .strict()
//               .optional(),
//           })
//           .strict(),

//         chave: z.string().describe('Chave Pix do recebedor'),

//         solicitacaoPagador: z
//           .string()
//           .describe('Texto exibido ao pagador solicitando informações adicionais')
//           .optional(),

//         loc: z
//           .object({
//             id: z
//               .number()
//               .describe(
//                 'Identificador da localização do payload. Para associar a location a uma cobrança com vencimento, este location gerado deve ser do tipo cobv.',
//               ),
//           })
//           .strict()
//           .optional(),

//         infoAdicionais: z
//           .array(
//             z
//               .object({
//                 nome: z.string().describe('Nome do campo adicional'),
//                 valor: z.string().describe('Valor do campo adicional'),
//               })
//               .strict(),
//           )
//           .describe('Lista de informações adicionais para exibição ao pagador')
//           .optional(),
//       })
//       .strict()
//       .describe('Corpo da requisição HTTP'),
//   },
//   handler: async ({
//     params,
//     body,
//   }: {
//     params: PixCreateDueChargeParams;
//     body: PixCreateDueChargeBody;
//   }): Promise<McpResponse> => {
//     try {
//       const result = await EfiSDK.pixCreateDueCharge(params, body);

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
