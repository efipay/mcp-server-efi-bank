/* -------------------------------------------------------------------------- */
/*                               EXTRATO – FILES                              */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/extrato-cnab/arquivos*
 *
 * *Params*
 */
export type StatementFilesParams = {}

/**
 * *GET /v1/extrato-cnab/arquivos*
 *
 * *Body*
 */
export type StatementFilesBody = {}

/**
 * *GET /v1/extrato-cnab/arquivos*
 *
 * *Response*
 */
export type StatementFilesResponse = Promise<
  Array<{
    data_geracao: string
    nome: string
  }>
>

/* -------------------------------------------------------------------------- */
/*                         EXTRATO – FILE DOWNLOAD                            */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/extrato-cnab/download/:nome_arquivo*
 *
 * *Params*
 */
export type StatementFileParams = {
  nome_arquivo: string
}

/**
 * *GET /v1/extrato-cnab/download/:nome_arquivo*
 *
 * *Body*
 */
export type StatementFileBody = {}

/**
 * *GET /v1/extrato-cnab/download/:nome_arquivo*
 *
 * *Response*
 *
 * A API devolve o conteúdo do arquivo em texto.
 */
export type StatementFileResponse = string

/* -------------------------------------------------------------------------- */
/*                      EXTRATO – RECURRENCES (LIST)                          */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/extrato-cnab/agendamentos*
 *
 * *Params*
 */
export type StatementRecurrencesParams = {}

/**
 * *GET /v1/extrato-cnab/agendamentos*
 *
 * *Body*
 */
export type StatementRecurrencesBody = {}

/**
 * *GET /v1/extrato-cnab/agendamentos*
 *
 * *Response*
 */
export type StatementRecurrencesResponse = Promise<
  Array<{
    status: string
    periodicidade: string
    envia_email: boolean
    comprimir_arquivos: boolean
    data_criacao: string
  }>
>

/* -------------------------------------------------------------------------- */
/*                       EXTRATO – RECURRENCE (CREATE)                        */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/extrato-cnab/agendar*
 *
 * *Params*
 */
export type StatementRecurrencyCreateParams = {}

/**
 * *POST /v1/extrato-cnab/agendar*
 *
 * *Body*
 */
export type StatementRecurrencyCreateBody = {
  periodicidade: string
  enviar_email: boolean
  comprimir_arquivos: boolean
}

/**
 * *POST /v1/extrato-cnab/agendar*
 *
 * *Response*
 */
export type StatementRecurrencyCreateResponse = void

/* -------------------------------------------------------------------------- */
/*                       EXTRATO – RECURRENCE (UPDATE)                        */
/* -------------------------------------------------------------------------- */

/**
 * *PATCH /v1/extrato-cnab/agendar/:identificador*
 *
 * *Params*
 */
export type StatementRecurrencyUpdateParams = {
  identificador: string
}

/**
 * *PATCH /v1/extrato-cnab/agendar/:identificador*
 *
 * *Body*
 */
export type StatementRecurrencyUpdateBody = {
  periodicidade: string
  status: string
  envia_email: boolean
  comprimir_arquivos: boolean
}

/**
 * *PATCH /v1/extrato-cnab/agendar/:identificador*
 *
 * *Response*
 */
export type StatementRecurrencyUpdateResponse = void

/* -------------------------------------------------------------------------- */
/*                          EXTRATO – SFTP KEY CREATE                         */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/extrato-cnab/gerar-chaves*
 *
 * *Params*
 */
export type StatementSftpKeyParams = {}

/**
 * *POST /v1/extrato-cnab/gerar-chaves*
 *
 * *Body*
 */
export type StatementSftpKeyBody = {}

/**
 * *POST /v1/extrato-cnab/gerar-chaves*
 *
 * *Response*
 */
export type StatementSftpKeyResponse = { privateKey: string }
