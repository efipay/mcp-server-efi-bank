export const TOOLS_CONFIG = {
  // Cobranças imediatas
  pixCreateImmediateCharge: {
    name: 'pix_create_immediate_charge',
    description:
      'Cria uma cobrança imediata via Pix com valor, chave, dados do devedor e informações adicionais.',
  },
  pixCreateCharge: {
    name: 'pix_create_charge',
    description:
      'Cria uma cobrança imediata via Pix, informando o txid previamente, com valor, chave, dados do devedor e informações adicionais.',
  },
  pixUpdateCharge: {
    name: 'pix_update_charge',
    description: 'Revisa (modifica) uma cobrança a partir do seu txid.',
  },
  pixDetailCharge: {
    name: 'pix_detail_charge',
    description: 'Consulta uma cobrança a partir do txid.',
  },
  pixListCharges: {
    name: 'pix_list_charges',
    description:
      'Lista cobranças. Esse recurso possui filtros para afunilar os resultados da busca, tais como CPF/CNPJ e status. Dentre todos os filtros disponíveis, os filtros inicio e fim são obrigatórios e representam o intervalo de datas em que as cobranças consultadas devem estar compreendidas.',
  },
  // Cobranças com vencimento
  pixCreateDueCharge: {
    name: 'pix_create_due_charge',
    description:
      'Cria uma cobrança com vencimento via Pix, informando o txid previamente, com valor, chave, dados do devedor e informações adicionais, e opções de juros, multa e desconto.',
  },

  // Envio e Pagamento Pix
  pixSend: {
    name: 'pix_send',
    description:
      'Realiza o envio direto de um Pix para uma chave Pix cadastrada em um PSP seja da Efí ou outro',
  },
  pixSendDetail: {
    name: 'pix_send_detail',
    description: 'Realiza a consulta de um Pix enviado através de seu e2eId.',
  },
  pixSendDetailId: {
    name: 'pix_send_detail_id',
    description: 'Realiza a consulta de um Pix enviado através de seu idEnvio',
  },
  pixSendList: {
    name: 'pix_send_list',
    description: 'Realiza a consulta de diversos Pix enviados.',
  },
  pixQrCodePay: {
    name: 'pix_qr_code_pay',
    description:
      'Realiza o pagamento de um QR Code Pix via API. O QR Code deve ter um valor associado.',
  },

  // Gestão Pix
  pixDetailReceived: {
    name: 'pix_detail_received',
    description: 'Realiza a consulta de um Pix recebido através do e2eid.',
  },
  pixReceivedList: {
    name: 'pix_received_list',
    description: 'Realiza a consulta de vários Pix recebidos.',
  },
  pixDevolution: {
    name: 'pix_devolution',
    description:
      'Realiza uma devolução usando o e2eid do Pix e o ID da devolução. O motivo atribuído à PACS.004 será “Devolução solicitada pelo usuário recebedor do pagamento original”, com a sigla “MD06”, conforme consta na aba RTReason da PACS.004 no Catálogo de Mensagens do Pix.',
  },
  pixDetailDevolution: {
    name: 'pix_detail_devolution',
    description:
      'Realiza a consulta de uma devolução através de um e2eid do Pix e do ID da devolução.',
  },

  // Webhooks
  pixConfigWebhook: {
    name: 'pix_config_webhook',
    description:
      'Configura o serviço de notificações acerca de Pix recebidos. Ao cadastrar seu webhook, enviaremos uma notificação de teste para a URL cadastrada, porém quando de fato uma notificação for enviada, o caminho /pix será acrescentado ao final da URL cadastrada. Para não precisar de duas rotas distintas, você poder adicionar um parâmetro ?ignorar= ao final da URL cadastrada, para que o /pix não seja acrescentado na rota da sua URL.',
  },
  pixDetailWebhook: {
    name: 'pix_detail_webhook',
    description: 'Recupera informações sobre o webhook pix',
  },
  pixListWebhook: {
    name: 'pix_list_webhook',
    description: 'Realiza a consulta de varios webhooks associados a chaves',
  },
  pixDeleteWebhook: {
    name: 'pix_delete_webhook',
    description: 'Remove o vínculo de um webhook de uma chave Pix',
  },
  pixResendWebhook: {
    name: 'pix_resend_webhook',
    description:
      'Realiza o reenvio de um evento para o webhook Pix. O reenvio de webhook para uma transação fica disponível por um prazo máximo de 30 dias. Nos casos de webhooks de devoluções (recebimento e envio) ocorre o reenvio de um webhook com todo o array de devolução ao invés de um webhook por devolução. Por exemplo, se você realizar duas devoluções relacionadas a um mesmo endToEndId, no envio, você receberá dois webhooks distintos. Porém, ao solicitar o reenvio, receberá apenas um webhook.',
  },

  // Endpoints exclusivos Efí
  pixCreateEvp: {
    name: 'pix_create_evp',
    description: 'Cria uma chave pix aleatória.',
  },
  pixListEvp: {
    name: 'pix_list_evp',
    description:
      'Lista as chaves pix aleatórias. A listagem somente mostrará as chaves do tipo aleatória.',
  },
  pixDeleteEvp: {
    name: 'pix_delete_evp',
    description:
      'Remove uma chave pix aleatória. É importante destacar que, ao remover uma chave aleatória, não será possível criá-la novamente, pois o uuid é gerado pelo DICT e cada solicitação de registro resulta em um hash diferente. Isso significa que as cobranças criadas para a chave removida não poderão mais ser pagas, pois o payload não será mais retornado.',
  },
  getAccountBalance: {
    name: 'get_account_balance',
    description: 'Consulta o saldo.',
  },
  updateAccountConfig: {
    name: 'update_account_config',
    description: 'Cria e modifica as configurações da conta do cliente relacionados à API.',
  },
  listAccountConfig: {
    name: 'list_account_config',
    description: 'Lista as configurações definidas na conta.',
  },
  pixGetReceipt: {
    name: 'pix_get_receipt',
    description: 'Obtem comprovantes de transações Pix realizadas via API.',
  },
  medList: {
    name: 'med_list',
    description: 'Lista as infrações MED abertas contra a conta.',
  },
};

export const SERVER_CONFIG = {
  name: 'mcp-server-efi',
  version: '0.0.1',
  description: 'Um serviço que dá acesso às APIs do Efí Bank.',
};
