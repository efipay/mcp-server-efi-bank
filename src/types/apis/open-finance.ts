/* -------------------------------------------------------------------------- */
/*                                CONFIGURAÇÃO                                */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/config*
 *
 * *Params*
 */
export type OfConfigDetailParams = {}

/**
 * *GET /v1/config*
 *
 * *Body*
 */
export type OfConfigDetailBody = {}

/**
 * *GET /v1/config*
 *
 * *Response*
 */
export type OfConfigDetailResponse = Promise<{
  redirectURL: string
  webhookURL: string
  webhookSecurity: { type: 'mtls' | 'hmac' }
}>

/**
 * *PUT /v1/config*
 *
 * *Params*
 */
export type OfConfigUpdateParams = {}

/**
 * *PUT /v1/config*
 *
 * *Body*
 */
export type OfConfigUpdateBody = {
  redirectURL: string
  webhookURL: string
  webhookSecurity?: { type: 'mtls' | 'hmac'; hash?: string }
  processPayment?: 'async' | 'sync'
}

/**
 * *PUT /v1/config*
 *
 * *Response*
 */
export type OfConfigUpdateResponse = Promise<{
  redirectURL: string
  webhookURL: string
  webhookSecurity: { type: 'mtls' | 'hmac'; hash?: string }
}>

/* -------------------------------------------------------------------------- */
/*                                PARTICIPANTES                               */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/participantes*
 *
 * *Params*
 */
export type OfListParticipantsParams = {
  nome?: string
  organizacao?: boolean
  modalidade?: 'imediato' | 'recorrente' | 'agendado'
  tipoPessoa?: 'PJ' | 'PF'
}

/**
 * *GET /v1/participantes*
 *
 * *Body*
 */
export type OfListParticipantsBody = {}

/**
 * *GET /v1/participantes*
 *
 * *Response*
 */
export type OfListParticipantsResponse = Promise<{
  participantes: Array<{
    identificador: string
    nome: string
    descricao: string
    portal: string
    logo: string
    organizacoes: Array<{
      nome: string
      cnpj: string
      status: string
    }>
  }>
}>

/* -------------------------------------------------------------------------- */
/*                        PAGAMENTOS PIX – LISTAGEM                           */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/pagamentos/pix*
 *
 * *Params*
 */
export type OfListPixPaymentParams = {
  inicio: string
  fim: string
  quantidade?: string
  pagina?: string
  status?: string
  identificador?: string
}

/**
 * *GET /v1/pagamentos/pix*
 *
 * *Body*
 */
export type OfListPixPaymentBody = {}

/**
 * *GET /v1/pagamentos/pix*
 *
 * *Response*
 */
export type OfListPixPaymentResponse = Promise<{
  pagamentos: Array<{
    identificadorPagamento: string
    endToEndId?: string
    valor?: string
    status: string
    dataCriacao: string
    devolucoes?: Array<{
      identificadorDevolucao: string
      valor: string
      status: string
      dataCriacao: string
    }>
    idProprio?: string
  }>
  total: string
  porPagina: string
  ultimo: string
  proximo: string | null
  anterior: string | null
  atual: string
}>

/* -------------------------------------------------------------------------- */
/*                   PAGAMENTOS PIX – INICIAÇÃO (SYNC/ASYNC)                  */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/pagamentos/pix*
 *
 * *Params*
 */
export type OfStartPixPaymentParams = {}

/**
 * *POST /v1/pagamentos/pix*
 *
 * *Body*
 */
export type OfStartPixPaymentBody = {
  pagador: {
    idParticipante: string
    cpf: string
    cnpj?: string
  }
  favorecido: {
    contaBanco: {
      codigoBanco: string
      agencia: string
      documento: string
      nome: string
      tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN'
    }
  }
  detalhes: {
    valor: string
    idProprio?: string
    infoPagador?: string
    dataAgendamento?: string
    codigoCidadeIBGE?: string
  }
}

/**
 * *POST /v1/pagamentos/pix*
 *
 * *Response*
 */
export type OfStartPixPaymentResponse = Promise<{
  identificadorPagamento: string
  redirectURI: string
}>

/**
 * *POST /v1/pagamentos/pix/:identificadorPagamento/devolver*
 *
 * *Params*
 */
export type OfDevolutionPixParams = { identificadorPagamento: string }

/**
 * *POST /v1/pagamentos/pix/:identificadorPagamento/devolver*
 *
 * *Body*
 */
export type OfDevolutionPixBody = { valor: string }

/**
 * *POST /v1/pagamentos/pix/:identificadorPagamento/devolver*
 *
 * *Response*
 */
export type OfDevolutionPixResponse = Promise<{
  identificadorPagamento: string
  valorDevolucao: string
  dataCriacao: string
  status: string
}>

/* -------------------------------------------------------------------------- */
/*                        PAGAMENTOS AGENDADOS – PIX                          */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/pagamentos-agendados/pix*
 *
 * *Params*
 */
export type OfStartSchedulePixPaymentParams = {}

/**
 * *POST /v1/pagamentos-agendados/pix*
 *
 * *Body*
 */
export type OfStartSchedulePixPaymentBody = {
  pagador: {
    idParticipante: string
    cpf: string
    cnpj?: string
  }
  favorecido: {
    contaBanco: {
      codigoBanco: string
      agencia: string
      documento: string
      nome: string
      tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN'
    }
  }
  pagamento: {
    valor: string
    codigoCidadeIBGE?: string
    infoPagador?: string
    idProprio?: string
    dataAgendamento: string
  }
}

/**
 * *POST /v1/pagamentos-agendados/pix*
 *
 * *Response*
 */
export type OfStartSchedulePixPaymentResponse = Promise<{
  identificadorPagamento: string
  redirectURI: string
}>

/**
 * *GET /v1/pagamentos-agendados/pix*
 *
 * *Params*
 */
export type OfListSchedulePixPaymentParams = {
  inicio: string
  fim: string
  quantidade?: string
  pagina?: string
  status?: string
  identificador?: string
}

/**
 * *GET /v1/pagamentos-agendados/pix*
 *
 * *Body*
 */
export type OfListSchedulePixPaymentBody = {}

/**
 * *GET /v1/pagamentos-agendados/pix*
 *
 * *Response*
 */
export type OfListSchedulePixPaymentResponse = Promise<{
  pagamentos: Array<{
    identificadorPagamento: string
    endToEndId?: string
    valor?: string
    status: string
    dataOperacao: string
    dataCriacao: string
    idProprio: string
    devolucoes: Array<{
      identificadorDevolucao: string
      valor: string
      status: string
      dataCriacao: string
    }>
  }>
  total: number
  porPagina: number
  ultimo: string
  proximo: string | null
  anterior: string | null
  atual: string
}>

/**
 * *PATCH /v1/pagamentos-agendados/pix/:identificadorPagamento/cancelar*
 *
 * *Params*
 */
export type OfCancelSchedulePixParams = { identificadorPagamento: string }

/**
 * *PATCH /v1/pagamentos-agendados/pix/:identificadorPagamento/cancelar*
 *
 * *Body*
 */
export type OfCancelSchedulePixBody = {}

/**
 * *PATCH /v1/pagamentos-agendados/pix/:identificadorPagamento/cancelar*
 *
 * *Response*
 */
export type OfCancelSchedulePixResponse = Promise<{
  pagamentos: {
    identificadorPagamento: string
    status: string
    dataCancelamento: string
  }
}>

/**
 * *POST /v1/pagamentos-agendados/pix/:identificadorPagamento/devolver*
 *
 * *Params*
 */
export type OfDevolutionSchedulePixParams = { identificadorPagamento: string }

/**
 * *POST /v1/pagamentos-agendados/pix/:identificadorPagamento/devolver*
 *
 * *Body*
 */
export type OfDevolutionSchedulePixBody = { valor: string }

/**
 * *POST /v1/pagamentos-agendados/pix/:identificadorPagamento/devolver*
 *
 * *Response*
 */
export type OfDevolutionSchedulePixResponse = Promise<{
  identificadorPagamento: string
  endToEndId: string
  valor: string
  dataCriacao: string
  status: string
}>

/* -------------------------------------------------------------------------- */
/*                        PAGAMENTOS RECORRENTES – PIX                        */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/pagamentos-recorrentes/pix*
 *
 * *Params*
 */
export type OfStartRecurrencyPixPaymentParams = {}

/**
 * *POST /v1/pagamentos-recorrentes/pix*
 *
 * *Body*
 */
export type OfStartRecurrencyPixPaymentBody = {
  pagador: {
    idParticipante: string
    cpf: string
    cnpj?: string
  }
  favorecido: {
    contaBanco: {
      codigoBanco: string
      agencia: string
      documento: string
      nome: string
      tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN'
    }
  }
  pagamento: {
    valor: string
    codigoCidadeIBGE?: string
    infoPagador?: string
    idProprio?: string
    recorrencia: {
      tipo: 'diaria' | 'semanal' | 'mensal' | 'personalizada'
      dataInicio?: string
      quantidade?: number
      diaDaSemana?: string
      diaDoMes?: number
      datas?: Array<string>
      descricao?: string
    }
  }
}

/**
 * *POST /v1/pagamentos-recorrentes/pix*
 *
 * *Response*
 */
export type OfStartRecurrencyPixPaymentResponse = Promise<{
  identificadorPagamento: string
  redirectURI: string
}>

/**
 * *GET /v1/pagamentos-recorrentes/pix*
 *
 * *Params*
 */
export type OfListRecurrencyPixPaymentParams = {
  inicio: string
  fim: string
  quantidade?: string
  pagina?: string
  status?: string
  identificador?: string
}

/**
 * *GET /v1/pagamentos-recorrentes/pix*
 *
 * *Body*
 */
export type OfListRecurrencyPixPaymentBody = {}

/**
 * *GET /v1/pagamentos-recorrentes/pix*
 *
 * *Response*
 */
export type OfListRecurrencyPixPaymentResponse = Promise<{
  pagamentos: Array<{
    identificadorPagamento: string
    valor: string
    status: string
    dataCriacao: string
    idProprio: string
    recorrencia: Array<{
      endToEndId: string
      dataOperacao: string
      status: string
      devolucoes: Array<{
        identificadorDevolucao: string
        valor: string
        status: string
        dataCriacao: string
      }>
    }>
  }>
  total: number
  porPagina: number
  ultimo: string
  proximo: string | null
  anterior: string | null
  atual: string
}>

/**
 * *PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/cancelar*
 *
 * *Params*
 */
export type OfCancelRecurrencyPixParams = { identificadorPagamento: string }

/**
 * *PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/cancelar*
 *
 * *Body*
 */
export type OfCancelRecurrencyPixBody = {}

/**
 * *PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/cancelar*
 *
 * *Response*
 */
export type OfCancelRecurrencyPixResponse = Promise<{
  pagamentos: {
    identificadorPagamento: string
    status: string
    dataCancelamento: string
  }
}>

/**
 * *POST /v1/pagamentos-recorrentes/pix/:identificadorPagamento/devolver*
 *
 * *Params*
 */
export type OfDevolutionRecurrencyPixParams = { identificadorPagamento: string }

/**
 * *POST /v1/pagamentos-recorrentes/pix/:identificadorPagamento/devolver*
 *
 * *Body*
 */
export type OfDevolutionRecurrencyPixBody = Array<{
  endToEndId: string
  valor: string
}>

/**
 * *POST /v1/pagamentos-recorrentes/pix/:identificadorPagamento/devolver*
 *
 * *Response*
 */
export type OfDevolutionRecurrencyPixResponse = Promise<
  Array<{
    identificadorPagamento: string
    endToEndId: string
    valor: string
    dataCriacao: string
    status: string
  }>
>

/**
 * *PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/substituir/:endToEndId*
 *
 * *Params*
 */
export type OfReplaceRecurrencyPixParcelParams = {
  identificadorPagamento: string
  endToEndId: string
}

/**
 * *PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/substituir/:endToEndId*
 *
 * *Body*
 */
export type OfReplaceRecurrencyPixParcelBody = { valor: string }

/**
 * *PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/substituir/:endToEndId*
 *
 * *Response*
 */
export type OfReplaceRecurrencyPixParcelResponse = Promise<{
  identificadorPagamento: string
  redirectURI: string
}>
