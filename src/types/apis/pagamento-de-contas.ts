/* -------------------------------------------------------------------------- */
/*                         DETALHES DO CÓDIGO DE BARRAS                       */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/codBarras/:codBarras*
 *
 * *Params*
 */
export type PayDetailBarCodeParams = { codBarras: string }

/**
 * *GET /v1/codBarras/:codBarras*
 *
 * *Body*
 */
export type PayDetailBarCodeBody = {}

/**
 * *GET /v1/codBarras/:codBarras*
 *
 * *Response*
 */
export type PayDetailBarCodeResponse = Promise<{
  tipo: 'boleto' | 'tributo'
  banco: { codigo: number; nome: string } | null
  codBarras: string
  linhaDigitavel: string
  datas: { vencimento: string; limitePagamento: string | null }
  beneficiario: { nome: string; documento: string; fantasia: string } | null
  pagador: { nome: string; documento: string } | null
  valores: {
    original: number
    abatimento: number | null
    multa: number
    juros: number
    desconto: number
    pago: number | null
    final: number
  }
  informacoesPagamento: {
    divergente: { deveAceitar: boolean; valorMinimo: number; valorMaximo: number }
    parcial: { deveAceitar: boolean; limiteDePagamentos: number }
    podeSerPago: boolean
  } | null
}>

/* -------------------------------------------------------------------------- */
/*                           SOLICITAÇÃO DE PAGAMENTO                         */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/codBarras/:codBarras*
 *
 * *Params*
 */
export type PayRequestBarCodeParams = { codBarras: string }

/**
 * *POST /v1/codBarras/:codBarras*
 *
 * *Body*
 */
export type PayRequestBarCodeBody = {
  dataPagamento: string
  valor: number
  descricao?: string
}

/**
 * *POST /v1/codBarras/:codBarras*
 *
 * *Response*
 */
export type PayRequestBarCodeResponse = Promise<{
  idPagamento: string
  valorPago: number
  status: string
  data: { solicitacao: string; pagamento: string }
}>

/* -------------------------------------------------------------------------- */
/*                          CONSULTA DE SOLICITAÇÃO                           */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/:idPagamento*
 *
 * *Params*
 */
export type PayDetailPaymentParams = { idPagamento: string }

/**
 * *GET /v1/:idPagamento*
 *
 * *Body*
 */
export type PayDetailPaymentBody = {}

/**
 * *GET /v1/:idPagamento*
 *
 * *Response*
 */
export type PayDetailPaymentResponse = Promise<{
  idPagamento: string
  codBarras?: string
  linhaDigitavel?: string
  valorPago?: number
  status?: string
  retornoBancario?: string
  protocolo?: string | null
  motivoRecusa?: string | null
  data?: { solicitacao: string; pagamento: string }
  descricao?: string
  horario?: { solicitacao: string }
}>

/* -------------------------------------------------------------------------- */
/*                             RESUMO DE PAGAMENTOS                           */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/resumo*
 *
 * *Params*
 */
export type PayListPaymentsParams = {
  dataInicio: string
  dataFim: string
}

/**
 * *GET /v1/resumo*
 *
 * *Body*
 */
export type PayListPaymentsBody = {}

/**
 * *GET /v1/resumo*
 *
 * *Response*
 */
export type PayListPaymentsResponse = Promise<{
  datas: { inicial: string; final: string }
  solicitacoes: {
    total: number
    processando: number
    sucesso: number
    falha: number
    cancelada: number
  }
  solicitacoesFalhas: Array<number>
}>

/* -------------------------------------------------------------------------- */
/*                                WEBHOOK – CRUD                              */
/* -------------------------------------------------------------------------- */

/**
 * *PUT /v1/webhook*
 *
 * *Params*
 */
export type PayConfigWebhookParams = {}

/**
 * *PUT /v1/webhook*
 *
 * *Body*
 */
export type PayConfigWebhookBody = { url: string }

/**
 * *PUT /v1/webhook*
 *
 * *Response*
 */
export type PayConfigWebhookResponse = { url: string }

/* ---------------------------------- LIST ---------------------------------- */

/**
 * *GET /v1/webhook*
 *
 * *Params*
 */
export type PayListWebhookParams = {
  dataInicio: string
  dataFim: string
}

/**
 * *GET /v1/webhook*
 *
 * *Body*
 */
export type PayListWebhookBody = {}

/**
 * *GET /v1/webhook*
 *
 * *Response*
 */
export type PayListWebhookResponse = Promise<{
  parametros: {
    inicio: string
    fim: string
    paginacao: {
      paginaAtual: number
      itensPorPagina: number
      quantidadeDePaginas: number
      quantidadeTotalDeItens: number
    }
  }
  webhooks: Array<{ url: string; criacao: string }>
}>

/* --------------------------------- DELETE --------------------------------- */

/**
 * *DELETE /v1/webhook*
 *
 * *Params*
 */
export type PayDeleteWebhookParams = {}

/**
 * *DELETE /v1/webhook*
 *
 * *Body*
 */
export type PayDeleteWebhookBody = { url: string }

/**
 * *DELETE /v1/webhook*
 *
 * *Response*
 */
export type PayDeleteWebhookResponse = void
