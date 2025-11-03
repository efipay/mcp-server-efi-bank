/* -------------------------------------------------------------------------- */
/*                     CRIAÇÃO DE CONTA SIMPLIFICADA (API v1)                 */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/conta-simplificada*
 *
 * *Params*
 */
export type AccountCreateParams = {}

/**
 * *POST /v1/conta-simplificada*
 *
 * *Body*
 */
export type AccountCreateBody = {
  clienteFinal: {
    cpf: string
    nomeCompleto: string
    dataNascimento: string
    nomeMae?: string
    celular: string
    email: string
    cnpj?: string
    razaoSocial?: string
    endereco: {
      cep: string
      estado:
        | 'AC'
        | 'AL'
        | 'AP'
        | 'AM'
        | 'BA'
        | 'CE'
        | 'DF'
        | 'ES'
        | 'GO'
        | 'MA'
        | 'MT'
        | 'MS'
        | 'MG'
        | 'PA'
        | 'PB'
        | 'PR'
        | 'PE'
        | 'PI'
        | 'RJ'
        | 'RN'
        | 'RS'
        | 'RO'
        | 'RR'
        | 'SC'
        | 'SP'
        | 'SE'
        | 'TO'
      cidade: string
      bairro: string
      logradouro: string
      numero: string
      complemento?: string
    }
  }
  meioDeNotificacao: Array<'sms' | 'whatsapp'>
  escoposIntegrados: Array<string>
}

/**
 * *POST /v1/conta-simplificada*
 *
 * *Response*
 */
export type AccountCreateResponse = Promise<{
  contaSimplificada: { identificador: string }
  id: string
  status: string
}>

/* -------------------------------------------------------------------------- */
/*                         CREDENCIAIS DA CONTA SIMPLIFICADA                  */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/conta-simplificada/:idContaSimplificada/credenciais*
 *
 * *Params*
 */
export type AccountCredentialsParams = {
  idContaSimplificada: string
}

/**
 * *GET /v1/conta-simplificada/:idContaSimplificada/credenciais*
 *
 * *Body*
 */
export type AccountCredentialsBody = {}

/**
 * *GET /v1/conta-simplificada/:idContaSimplificada/credenciais*
 *
 * *Response*
 */
export type AccountCredentialsResponse = Promise<{
  clientId: string
  clientSecret: string
  conta: {
    numero: string
    payeeCode: string
  }
  escopos: string[]
  ativo: boolean
}>

/* -------------------------------------------------------------------------- */
/*                     CERTIFICADO DA CONTA SIMPLIFICADA                      */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/conta-simplificada/:idContaSimplificada/certificado*
 *
 * *Params*
 */
export type AccountCertificateParams = {
  idContaSimplificada: string
}

/**
 * *POST /v1/conta-simplificada/:idContaSimplificada/certificado*
 *
 * *Body*
 */
export type AccountCertificateBody = {}

/**
 * *POST /v1/conta-simplificada/:idContaSimplificada/certificado*
 *
 * *Response*
 */
export type AccountCertificateResponse = { certificado: string }

/* -------------------------------------------------------------------------- */
/*                                WEBHOOK – CREATE                            */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/webhook*
 *
 * *Params*
 */
export type AccountConfigWebhookParams = {}

/**
 * *POST /v1/webhook*
 *
 * *Body*
 */
export type AccountConfigWebhookBody = {
  webhookUrl?: string
  url?: string
  chave?: string
}

/**
 * *POST /v1/webhook*
 *
 * *Response*
 */
export type AccountConfigWebhookResponse = Promise<{
  identificadorWebhook: string
}>

/* -------------------------------------------------------------------------- */
/*                              WEBHOOK – DETAIL                              */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/webhook/:identificadorWebhook*
 *
 * *Params*
 */
export type AccountDetailWebhookParams = {
  identificadorWebhook: string
}

/**
 * *GET /v1/webhook/:identificadorWebhook*
 *
 * *Body*
 */
export type AccountDetailWebhookBody = {}

/**
 * *GET /v1/webhook/:identificadorWebhook*
 *
 * *Response*
 */
export type AccountDetailWebhookResponse = Promise<{
  webhookUrl: string
  identificadorWebhook: string
  criacao: string
}>

/* -------------------------------------------------------------------------- */
/*                               WEBHOOK – LIST                               */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/webhooks*
 *
 * *Params*
 */
export type AccountListWebhookParams = {
  inicio: string
  fim: string
}

/**
 * *GET /v1/webhooks*
 *
 * *Body*
 */
export type AccountListWebhookBody = {}

/**
 * *GET /v1/webhooks*
 *
 * *Response*
 */
export type AccountListWebhookResponse = Promise<{
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
  webhooks: Array<{
    webhookUrl: string
    identificadorWebhook: string
    criacao: string
  }>
}>

/* -------------------------------------------------------------------------- */
/*                               WEBHOOK – DELETE                             */
/* -------------------------------------------------------------------------- */

/**
 * *DELETE /v1/webhook/:identificadorWebhook*
 *
 * *Params*
 */
export type AccountDeleteWebhookParams = {
  identificadorWebhook: string
}

/**
 * *DELETE /v1/webhook/:identificadorWebhook*
 *
 * *Body*
 */
export type AccountDeleteWebhookBody = {}

/**
 * *DELETE /v1/webhook/:identificadorWebhook*
 *
 * *Response*
 */
export type AccountDeleteWebhookResponse = void
