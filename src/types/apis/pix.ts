export type TipoCob = "cob" | "cobv"
export type StatusPixReceived = "ATIVA" | "CONCLUIDA" | "REMOVIDA_PELO_USUARIO_RECEBEDOR" | "REMOVIDA_PELO_PSP"
export type StatusPixSent = "EM_PROCESSAMENTO" | "REALIZADO" | "NAO_REALIZADO"
export type StatusPixDevolution = "EM_PROCESSAMENTO" | "DEVOLVIDO" | "NAO_REALIZADO"
export type StatusReport = "AGUARDANDO_PROCESSAMENTO" | "EM_PROCESSAMENTO" | "CONCLUIDO"
export type StatusMed = "ABERTA" | "ACEITA" | "CANCELADA_EFI" | "EM_DEFESA" | "REJEITADA"
export type TipoSituacaoMed = "golpe" | "aquisição da conta" | "coerção" | "acesso fraudulento" | "outro" | "desconhecido"
export type TipoPixResendWebhook = "PIX_RECEBIDO" | "PIX_ENVIADO" | "DEVOLUCAO_RECEBIDA" | "DEVOLUCAO_ENVIADA"

/**
 * *POST /v2/cob*
 * 
 * *Params*
 * 
 */
export type PixCreateImmediateChargeParams = {}

/**
 * *POST /v2/cob*
 * 
 * *Body*
 * 
 */
export type PixCreateImmediateChargeBody = {
        calendario: {
            expiracao: number;
        };
        /**
         * O objeto devedor é opcional, se informado é preciso que seja enviado junto ao `nome` o `cpf` ou `cnpj`.
         */
        devedor?: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor: {
            original: string;
        };
        chave: string;
        solicitacaoPagador?: string;
        loc?: {
            id: number;
        };
        infoAdicionais?: Array<{
            nome: string;
            valor: string;
        }>;
    }
    
/**
 * *POST /v2/cob*
 * 
 * *Response*
 * 
 */    
export type PixCreateImmediateChargeResponse = Promise<{
        calendario: {
            criacao: string;
            expiracao: number;
        };
        txid: string;
        revisao: number;
        loc: {
            id: number;
            location: string;
            tipoCob: TipoCob;
        };
        location: string;
        status: StatusPixReceived;
        devedor?: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor: {
            original: string;
        };
        chave: string;
        solicitacaoPagador?: string;
        pixCopiaECola: string;
    }>



/**
 * *PUT /v2/cob/:txid*
 * 
 * *Params*
 * 
 */
export type PixCreateChargeParams = { txid: string }

/**
 * *PUT /v2/cob/:txid*
 * 
 * *Body*
 * 
 */

export type PixCreateChargeBody = {
        calendario: {
            expiracao: number;
        };
        /**
         * O objeto devedor é opcional, se informado é preciso que seja enviado junto ao `nome` o `cpf` ou `cnpj`.
         */        
        devedor?: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor: {
            original: string;
        };
        chave: string;
        solicitacaoPagador?: string;
        loc?: {
            id: number;
        };
        infoAdicionais?: Array<{
            nome: string;
            valor: string;
        }>;
    }

/**
 * *PUT /v2/cob/:txid*
 * 
 * *Response*
 * 
 */
export type PixCreateChargeResponse = Promise<{
        calendario: {
            criacao: string;
            expiracao: number;
        };
        txid: string;
        revisao: number;
        loc: {
            id: number;
            location: string;
            tipoCob: TipoCob;
        };
        location: string;
        status: StatusPixReceived;
        devedor?: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor: {
            original: string;
        };
        chave: string;
        solicitacaoPagador?: string;
        pixCopiaECola: string;
    }>



/**
 * *PATCH /v2/cob/:txid*
 * 
 * *Params*
 * 
 */
export type PixUpdateChargeParams = { txid: string }

/**
 * *PATCH /v2/cob/:txid*
 * 
 * *Body*
 * 
 */
export type PixUpdateChargeBody = {
        calendario?: {
            expiracao: number;
        };
        devedor?: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor?: {
            original: string;
        };
        status?: StatusPixReceived;
        chave?: string;
        solicitacaoPagador?: string;
        loc?: {
            id: number;
        };
        infoAdicionais?: Array<{
            nome: string;
            valor: string;
        }>;
    }

/**
 * *PATCH /v2/cob/:txid*
 * 
 * *Response*
 * 
 */
export type PixUpdateChargeResponse = Promise<{
        status: StatusPixReceived;
        calendario: {
            criacao: string;
            expiracao: number;
        };
        location: string;
        txid: string;
        revisao: number;
        devedor: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor: {
            original: string;
        };
        chave: string;
        solicitacaoPagador: string | null;
        pixCopiaECola: string;
    }>



/**
 * *GET /v2/cob/:txid*
 * 
 * *Params*
 * 
 */
export type PixDetailChargeParams = { 
        txid: string,
        revisao?: number
    }

/**
 * *GET /v2/cob/:txid*
 * 
 * *Body*
 * 
 */
export type PixDetailChargeBody = {}

/**
 * *GET /v2/cob/:txid*
 * 
 * *Response*
 * 
 */
export type PixDetailChargeResponse = Promise<{
        status: StatusPixReceived;
        calendario: {
            criacao: string;
            expiracao: string;
        };
        location: string;
        txid: string;
        revisao: number;
        devedor?: {
            cpf?: string;
            cnpj?: string;
            nome: string;
        };
        valor: {
            original: string;
        };
        chave: string;
        solicitacaoPagador?: string;
        pixCopiaECola?: string;
        pix?: Array<{
            endToEndId: string;
            txid: string;
            valor: string;
            horario: string;
            infoPagador?: string;
            devolucoes?: Array<{
                id: string;
                rtrId: string;
                valor: string;
                horario: {
                    solicitacao: string;
                };
                status: StatusPixDevolution;
            }>;
        }>;
    }>

/**
 * *GET /v2/cob*
 *
 * *Params*
 */
export type PixListChargesParams = {
  inicio: string;
  fim: string;
  cpf?: string;
  cnpj?: string;
  status?: StatusPixReceived;
};

/**
 * *GET /v2/cob*
 *
 * *Body*
 */
export type PixListChargesBody = {};

/**
 * *GET /v2/cob*
 *
 * *Response*
 */
export type PixListChargesResponse = Promise<{
  parametros: {
    inicio: string;
    fim: string;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  cobs: Array<{
    status: StatusPixReceived;
    calendario: {
      criacao: string;
      expiracao: string;
    };
    location: string;
    txid: string;
    revisao: number;
    devedor?: {
      cpf?: string;
      cnpj?: string;
      nome: string;
    };
    valor: {
      original: string;
    };
    chave: string;
    solicitacaoPagador?: string;
    pixCopiaECola?: string;
    pix?: Array<{
      endToEndId: string;
      txid: string;
      valor: string;
      horario: string;
      pagador?: {
        cpf?: string;
        cnpj?: string;
        nome: string;
      };
      infoPagador?: string;
      devolucoes?: Array<{
        id: string;
        rtrId: string;
        valor: string;
        horario: {
          solicitacao: string;
        };
        status: StatusPixDevolution;
      }>;
    }>;
  }>;
}>;

/**
 * *PUT /v2/cobv/:txid*
 *
 * *Params*
 */
export type PixCreateDueChargeParams = {
  txid: string;
};

/**
 * *PUT /v2/cobv/:txid*
 *
 * *Body*
 */
export type PixCreateDueChargeBody = {
  calendario: {
    dataDeVencimento: string;
    validadeAposVencimento?: number;
  };
  devedor: {
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    cpf?: string;
    cnpj?: string;
    nome: string;
  };
  valor: {
    original: string;
    multa?: {
      modalidade: number;
      valorPerc: string;
    };
    juros?: {
      modalidade: number;
      valorPerc: string;
    };
    desconto?: {
      modalidade: number;
      valorPerc?: string;
      descontoDataFixa?: Array<{
        data: string;
        valorPerc: string;
      }>;
    };
    abatimento?: {
      modalidade: number;
      valorPerc: string;
    };
  };
  loc?: {
    id: number;
  };
  chave: string;
  solicitacaoPagador?: string;
};

/**
 * *PUT /v2/cobv/:txid*
 *
 * *Response*
 */
export type PixCreateDueChargeResponse = Promise<{
  calendario: {
    dataDeVencimento: string;
    validadeAposVencimento: number;
  };
  devedor: {
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    cpf?: string;
    cnpj?: string;
    nome: string;
  };
  valor: {
    original: string;
    multa?: {
      modalidade: number;
      valorPerc: string;
    };
    juros?: {
      modalidade: number;
      valorPerc: string;
    };
    desconto?: {
      modalidade: number;
      valorPerc?: string;
      descontoDataFixa?: Array<{
        data: string;
        valorPerc: string;
      }>;
    };
    abatimento?: {
      modalidade: number;
      valorPerc: string;
    };
  };
  loc?: {
    id: number;
  };
  chave: string;
  solicitacaoPagador?: string;
}>;

/**
 * *PATCH /v2/cobv/:txid*
 *
 * *Params*
 */
export type PixUpdateDueChargeParams = {
  txid: string;
};

/**
 * *PATCH /v2/cobv/:txid*
 *
 * *Body*
 */
export type PixUpdateDueChargeBody = {
  status?: StatusPixReceived;
  calendario?: {
    dataDeVencimento?: string;
    validadeAposVencimento?: number;
  };
  devedor?: {
    cpf?: string;
    cnpj?: string;
    nome?: string;
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  };
  valor?: {
    original?: string;
    multa?: {
      modalidade?: number;
      valorPerc?: string;
    };
    juros?: {
      modalidade?: number;
      valorPerc?: string;
    };
    desconto?: {
      modalidade?: number;
      valorPerc?: string;
      descontoDataFixa?: Array<{
        data?: string;
        valorPerc?: string;
      }>;
    };
    abatimento?: {
      modalidade?: number;
      valorPerc?: string;
    };
  };
  chave?: string;
  solicitacaoPagador?: string;
  loc?: {
    id?: number;
  };
};

/**
 * *PATCH /v2/cobv/:txid*
 *
 * *Response*
 */
export type PixUpdateDueChargeResponse = Promise<{
  status: StatusPixReceived;
  calendario: {
    dataDeVencimento: string;
    validadeAposVencimento?: number;
  };
  devedor?: {
    cpf?: string;
    cnpj?: string;
    nome: string;
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  };
  valor: {
    original: string;
    multa?: {
      modalidade: number;
      valorPerc: string;
    };
    juros?: {
      modalidade: number;
      valorPerc: string;
    };
    desconto?: {
      modalidade: number;
      valorPerc?: string;
      descontoDataFixa?: Array<{
        data: string;
        valorPerc: string;
      }>;
    };
    abatimento?: {
      modalidade: number;
      valorPerc: string;
    };
  };
  chave: string;
  solicitacaoPagador?: string;
  loc?: {
    id: number;
  };
}>;

/**
 * *GET /v2/cobv/:txid*
 *
 * *Params*
 */
export type PixDetailDueChargeParams = {
  txid: string;
};

/**
 * *GET /v2/cobv/:txid*
 *
 * *Body*
 */
export type PixDetailDueChargeBody = {};

/**
 * *GET /v2/cobv/:txid*
 *
 * *Response*
 */
export type PixDetailDueChargeResponse = Promise<{
  calendario: {
    criacao: string;
    dataDeVencimento: string;
    validadeAposVencimento?: number;
  };
  txid: string;
  revisao: number;
  loc: {
    id: number;
    location: string;
    tipoCob: TipoCob;
  };
  status: StatusPixReceived;
  devedor?: {
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    cpf?: string;
    nome: string;
  };
  recebedor: {
    logradouro: string;
    cidade: string;
    uf: string;
    cep: string;
    cnpj?: string;
    cpf?: string;
    nome: string;
  };
  valor: {
    original: string;
    juros?: {
      modalidade: number;
      valorPerc: string;
    };
    multa?: {
      modalidade: number;
      valorPerc: string;
    };
    desconto?: {
      modalidade: number;
      valorPerc?: string;
      descontoDataFixa?: Array<{
        data: string;
        valorPerc: string;
      }>;
    };
    abatimento?: {
      modalidade: number;
      valorPerc: string;
    };
  };
  chave: string;
  solicitacaoPagador?: string;
  pixCopiaECola: string;
}>;

/**
 * *GET /v2/cobv*
 *
 * *Params*
 */
export type PixListDueChargesParams = {
  inicio: string;
  fim: string;
};

/**
 * *GET /v2/cobv*
 *
 * *Body*
 */
export type PixListDueChargesBody = {};

/**
 * *GET /v2/cobv*
 *
 * *Response*
 */
export type PixListDueChargesResponse = Promise<{
  parametros: {
    inicio: string;
    fim: string;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  cobs: Array<{
    calendario: {
      criacao: string;
      dataDeVencimento: string;
      validadeAposVencimento: number;
    };
    txid: string;
    revisao: number;
    status: StatusPixReceived;
    devedor: {
      nome: string;
      cpf?: string;
      cnpj?: string;
      logradouro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
    };
    recebedor: {
      logradouro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
      cnpj?: string;
      nome?: string;
    };
    valor: {
      original: string;
      juros?: {
        modalidade: number;
        valorPerc: string;
      };
      multa?: {
        modalidade: number;
        valorPerc: string;
      };
      desconto?: {
        modalidade: number;
        descontoDataFixa?: Array<{
          data: string;
          valorPerc: string;
        }>;
        valorPerc?: string;
      };
      abatimento?: {
        modalidade: number;
        valorPerc: string;
      };
    };
    chave: string;
    solicitacaoPagador?: string;
    infoAdicionais?: Array<{
      nome: string;
      valor: string;
    }>;
    loc: {
      id: number;
      location: string;
      tipoCob: TipoCob;
      criacao: string;
    };
    pixCopiaECola: string;
  }>;
}>;

/**
 * *PUT /v3/gn/pix/:idEnvio*
 *
 * *Params*
 */
export type PixSendParams = {
  idEnvio: string;
};

/**
 * *PUT /v3/gn/pix/:idEnvio*
 *
 * *Body*
 */
export type PixSendBody = {
  valor: string;
  pagador: {
    chave: string;
    infoPagador?: string;
  };
  favorecido: {
    chave?: string;
    contaBanco?: {
      nome: string;
      cpf?: string;
      cnpj?: string;
      codigoBanco: string;
      agencia: string;
      conta: string;
      tipoConta: string;
    };
    cpf?: string;
    cnpj?: string;
  };
};

/**
 * *PUT /v3/gn/pix/:idEnvio*
 *
 * *Response*
 */
export type PixSendResponse = Promise<{
  idEnvio: string;
  e2eId: string;
  valor: string;
  horario: {
    solicitacao: string;
  };
  status: StatusPixSent;
}>;

/**
 * *GET /v2/gn/pix/enviados/:e2eid*
 *
 * *Params*
 */
export type PixSendDetailParams = {
  e2eid: string;
};

/**
 * *GET /v2/gn/pix/enviados/:e2eid*
 *
 * *Body*
 */
export type PixSendDetailBody = {};

/**
 * *GET /v2/gn/pix/enviados/:e2eid*
 *
 * *Response*
 */
export type PixSendDetailResponse = Promise<{
  endToEndId: string;
  idEnvio: string;
  valor: string;
  chave: string;
  status: StatusPixSent;
  infoPagador?: string;
  horario: {
    solicitacao: string;
    liquidacao: string;
  };
  favorecido: {
    chave?: string;
    identificacao?: {
      nome: string;
      cpf?: string;
      cnpj?: string;
    };
    contaBanco?: {
      nome: string;
      cpf?: string;
      cnpj?: string;
      agencia: string;
      conta: string;
      tipoConta: string;
    };
  };
}>;

/**
 * *GET /v2/gn/pix/enviados/id-envio/:idEnvio*
 *
 * *Params*
 */
export type PixSendDetailIdParams = {
  idEnvio: string;
};

/**
 * *GET /v2/gn/pix/enviados/id-envio/:idEnvio*
 *
 * *Body*
 */
export type PixSendDetailIdBody = {};

/**
 * *GET /v2/gn/pix/enviados/id-envio/:idEnvio*
 *
 * *Response*
 */
export type PixSendDetailIdResponse = Promise<{
  endToEndId: string;
  idEnvio: string;
  valor: string;
  chave: string;
  status: StatusPixSent;
  infoPagador?: string;
  horario: {
    solicitacao: string;
    liquidacao: string;
  };
  favorecido: {
    chave?: string;
    identificacao?: {
      nome: string;
      cpf?: string;
      cnpj?: string;
    };
    contaBanco?: {
      nome: string;
      cpf?: string;
      cnpj?: string;
      agencia: string;
      conta: string;
      tipoConta: string;
    };
  };
}>;

/**
 * *GET /v2/gn/pix/enviados*
 *
 * *Params*
 */
export type PixSendListParams = {
  inicio: string;
  fim: string;
  status?: StatusPixSent;
  devolucaoPresente?: boolean;
  "paginacao.itensPorPagina"?: number;
  "paginacao.paginaAtual"?: number;
};

/**
 * *GET /v2/gn/pix/enviados*
 *
 * *Body*
 */
export type PixSendListBody = {};

/**
 * *GET /v2/gn/pix/enviados*
 *
 * *Response*
 */
export type PixSendListResponse = Promise<
  Array<{
    endToEndId: string;
    idEnvio: string;
    valor: string;
    chave: string;
    status: StatusPixSent;
    infoPagador?: string;
    horario: {
      solicitacao: string;
      liquidacao: string;
    };
    favorecido: {
      chave?: string;
      identificacao?: {
        nome: string;
        cpf?: string;
        cnpj?: string;
      };
      contaBanco?: {
        nome: string;
        cpf?: string;
        cnpj?: string;
        agencia: string;
        conta: string;
        tipoConta: string;
      };
    };
  }>
>;

/**
 * *POST /v2/gn/qrcodes/detalhar*
 *
 * *Params*
 */
export type PixQrCodeDetailParams = {};

/**
 * *POST /v2/gn/qrcodes/detalhar*
 *
 * *Body*
 */
export type PixQrCodeDetailBody = {
  pixCopiaECola: string;
};

/**
 * *POST /v2/gn/qrcodes/detalhar*
 *
 * *Response*
 */
export type PixQrCodeDetailResponse = Promise<{
  tipoCob: TipoCob;
  txid: string;
  revisao: number;
  calendario: {
    criacao: string;
    apresentacao: string;
    expiracao?: number;
    dataDeVecimento?: string;
    validadeAposVencimento?: number;
  };
  status: StatusPixReceived;
  devedor: {
    nome: string;
    cpf?: string;
    cnpj?: string;
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  };
  recebedor: {
    nome: string;
    cpf?: string;
    cnpj?: string;
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  };
  valor: {
    final: string;
    abatimento?: string;
    desconto?: string;
    original?: string;
    juros?: string;
    multa?: string;
  };
  chave: string;
  solicitacaoPagador: string;
  infoAdicionais?: Array<{
    nome: string;
    valor: string;
  }>
}>;

/**
 * *PUT /v2/gn/pix/:idEnvio/qrcode*
 *
 * *Params*
 */
export type PixQrCodePayParams = {
  idEnvio: string;
};

/**
 * *PUT /v2/gn/pix/:idEnvio/qrcode*
 *
 * *Body*
 */
export type PixQrCodePayBody = {
  pagador: {
    chave: string;
    infoPagador?: string;
  };
  pixCopiaECola: string;
};

/**
 * *PUT /v2/gn/pix/:idEnvio/qrcode*
 *
 * *Response*
 */
export type PixQrCodePayResponse = Promise<{
  idEnvio: string;
  e2eId: string;
  valor: string;
  horario: {
    solicitacao: string;
  };
  status: StatusPixSent;
}>;

/**
 * *GET /v2/pix/:e2eId*
 *
 * *Params*
 */
export type PixDetailReceivedParams = {
  e2eId: string;
};

/**
 * *GET /v2/pix/:e2eId*
 *
 * *Body*
 */
export type PixDetailReceivedBody = {};

/**
 * *GET /v2/pix/:e2eId*
 *
 * *Response*
 */
export type PixDetailReceivedResponse = Promise<{
  endToEndId: string;
  txid: string;
  valor: string;
  horario: string;
  infoPagador?: string;
  devolucoes?: Array<{
    id: string;
    rtrId: string;
    valor: string;
    horario: {
      solicitacao: string;
    };
    status: StatusPixReceived;
  }>;
}>;

/**
 * *GET /v2/pix*
 *
 * *Params*
 */
export type PixReceivedListParams = {
  inicio: string;
  fim: string;
  txid?: string;
  txIdPresente?: boolean;
  devolucaoPresente?: boolean;
  cpf?: string;
  cnpj?: string;
  "paginacao.itensPorPagina"?: number;
  "paginacao.paginaAtual"?: number;
};

/**
 * *GET /v2/pix*
 *
 * *Body*
 */
export type PixReceivedListBody = {};

/**
 * *GET /v2/pix*
 *
 * *Response*
 */
export type PixReceivedListResponse = Promise<{
  parametros: {
    inicio: string;
    fim: string;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  pix: Array<{
    endToEndId: string;
    txid?: string;
    valor: string;
    chave?: string;
    horario: string;
    devolucoes?: Array<{
      id: string;
      rtrId: string;
      valor: string;
      horario: {
        solicitacao: string;
        liquidacao: string;
      };
      status: StatusPixReceived;
    }>;
  }>;
}>;

/**
 * *PUT /v2/pix/:e2eId/devolucao/:id*
 *
 * *Params*
 */
export type PixDevolutionParams = {
  e2eId: string;
  id: string;
};

/**
 * *PUT /v2/pix/:e2eId/devolucao/:id*
 *
 * *Body*
 */
export type PixDevolutionBody = {
  valor: string;
};

/**
 * *PUT /v2/pix/:e2eId/devolucao/:id*
 *
 * *Response*
 */
export type PixDevolutionResponse = Promise<{
  id: string;
  rtrId: string;
  valor: string;
  horario: {
    solicitacao: string;
  };
  status: StatusPixDevolution;
}>;

/**
 * *GET /v2/pix/:e2eId/devolucao/:id*
 *
 * *Params*
 */
export type PixDetailDevolutionParams = {
  e2eId: string;
  id: string;
};

/**
 * *GET /v2/pix/:e2eId/devolucao/:id*
 *
 * *Body*
 */
export type PixDetailDevolutionBody = {};

/**
 * *GET /v2/pix/:e2eId/devolucao/:id*
 *
 * *Response*
 */
export type PixDetailDevolutionResponse = Promise<{
  id: string;
  rtrId: string;
  valor: string;
  horario: {
    solicitacao: string;
  };
  status: StatusPixDevolution;
}>;

/**
 * *POST /v2/loc*
 *
 * *Params*
 */
export type PixCreateLocationParams = {};


/**
 * *POST /v2/loc*
 *
 * *Body*
 */
export type PixCreateLocationBody = {
  tipoCob: TipoCob;
};

/**
 * *POST /v2/loc*
 *
 * *Response*
 */
export type PixCreateLocationResponse = Promise<{
  id: number;
  location: string;
  tipoCob: TipoCob;
  criacao: string;
}>;

/**
 * *GET /v2/loc*
 *
 * *Params*
 */
export type PixLocationListParams = {
  inicio: string;
  fim: string;
};

/**
 * *GET /v2/loc*
 *
 * *Body*
 */
export type PixLocationListBody = {};

/**
 * *GET /v2/loc*
 *
 * *Response*
 */
export type PixLocationListResponse = Promise<{
  parametros: {
    inicio: string;
    fim: string;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  loc: Array<{
    id: number;
    location: string;
    tipoCob: TipoCob;
    criacao: string;
    txid?: string;
  }>;
}>;

/**
 * *GET /v2/loc/:id*
 *
 * *Params*
 */
export type PixDetailLocationParams = {
  id: number;
};

/**
 * *GET /v2/loc/:id*
 *
 * *Body*
 */
export type PixDetailLocationBody = {};

/**
 * *GET /v2/loc/:id*
 *
 * *Response*
 */
export type PixDetailLocationResponse = Promise<{
  id: number;
  txid: string;
  location: string;
  tipoCob: TipoCob;
  criacao: string;
}>;

/**
 * *GET /v2/loc/:id/qrcode*
 *
 * *Params*
 */
export type PixGenerateQRCodeParams = {
  id: number;
};

/**
 * *GET /v2/loc/:id/qrcode*
 *
 * *Body*
 */
export type PixGenerateQRCodeBody = {};

/**
 * *GET /v2/loc/:id/qrcode*
 *
 * *Response*
 */
export type PixGenerateQRCodeResponse = Promise<{
  qrcode: string;
  imagemQrcode: string;
  linkVisualizacao: string;
}>;

/**
 * *DELETE /v2/loc/:id/txid*
 *
 * *Params*
 */
export type PixUnlinkTxidLocationParams = {
  id: number;
};

/**
 * *DELETE /v2/loc/:id/txid*
 *
 * *Body*
 */
export type PixUnlinkTxidLocationBody = {};

/**
 * *DELETE /v2/loc/:id/txid*
 *
 * *Response*
 */
export type PixUnlinkTxidLocationResponse = Promise<{
  id: number;
  location: string;
  tipoCob: TipoCob;
  criacao: string;
}>;

/**
 * *PUT /v2/lotecobv/:id*
 *
 * *Params*
 */
export type PixCreateDueChargeBatchParams = {
  id: number;
};

/**
 * *PUT /v2/lotecobv/:id*
 *
 * *Body*
 */
export type PixCreateDueChargeBatchBody = {
  descricao: string;
  cobsv: Array<{
    calendario: {
      dataDeVencimento: string;
      validadeAposVencimento?: number;
    };
    txid: string;
    loc?: {
      id: number;
    };
    devedor?: {
      logradouro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
      cpf?: string;
      cnpj?: string;
      nome: string;
    };
    valor: {
      original: string;
      multa?: {
        modalidade: number;
        valorPerc: string;
      };
      juros?: {
        modalidade: number;
        valorPerc: string;
      };
      desconto?: {
        modalidade: number;
        descontoDataFixa?: Array<{
          data: string;
          valorPerc: string;
        }>;
        valorPerc?: string;
      };
      abatimento?: {
        modalidade: number;
        valorPerc: string;
      };
    };
    chave: string;
    solicitacaoPagador: string;
    infoAdicionais?: Array<{
      nome: string;
      valor: string;
    }>;
  }>;
};

/**
 * *PUT /v2/lotecobv/:id*
 *
 * *Response*
 */
export type PixCreateDueChargeBatchResponse = void;

/**
 * *PATCH /v2/lotecobv/:id*
 *
 * *Params*
 */
export type PixUpdateDueChargeBatchParams = {
  id: number;
};

/**
 * *PATCH /v2/lotecobv/:id*
 *
 * *Body*
 */
export type PixUpdateDueChargeBatchBody = {
  cobsv: Array<{
    txid: string;
    calendario?: {
      dataDeVencimento?: string;
      validadeAposVencimento?: number;
    };
    loc?: {
      id?: number;
    };
    devedor?: {
      logradouro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
      cpf?: string;
      cnpj?: string;
      nome?: string;
    };
    valor?: {
      original?: string;
      multa?: {
        modalidade?: number;
        valorPerc?: string;
      };
      juros?: {
        modalidade?: number;
        valorPerc?: string;
      };
      desconto?: {
        modalidade?: number;
        descontoDataFixa?: Array<{
          data?: string;
          valorPerc?: string;
        }>;
        valorPerc?: string;
      };
    };
    chave?: string;
    solicitacaoPagador?: string;
    infoAdicionais?: Array<{
      nome?: string;
      valor?: string;
    }>;
  }>;
};

/**
 * *PATCH /v2/lotecobv/:id*
 *
 * *Response*
 */
export type PixUpdateDueChargeBatchResponse = void;

/**
 * *GET /v2/lotecobv/:id*
 *
 * *Params*
 */
export type PixDetailDueChargeBatchParams = {
  id: number;
};

/**
 * *GET /v2/lotecobv/:id*
 *
 * *Body*
 */
export type PixDetailDueChargeBatchBody = {};

/**
 * *GET /v2/lotecobv/:id*
 *
 * *Response*
 */
export type PixDetailDueChargeBatchResponse = Promise<{
  descricao: string;
  criacao: string;
  cobsv: Array<{
    criacao?: string;
    txid: string;
    status: StatusPixReceived;
    problema?: {
      type: string;
      title: string;
      status: number;
      detail: string;
      violacoes: Array<{
        razao: string;
        propriedade: string;
      }>;
    };
  }>;
}>;

/**
 * *GET /v2/lotecobv*
 *
 * *Params*
 */
export type PixListDueChargeBatchParams = {
  inicio: string;
  fim: string;
};

/**
 * *GET /v2/lotecobv*
 *
 * *Body*
 */
export type PixListDueChargeBatchBody = {};

/**
 * *GET /v2/lotecobv*
 *
 * *Response*
 */
export type PixListDueChargeBatchResponse = Promise<{
  parametros: {
    inicio: string;
    fim: string;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  lotes: Array<{
    id: number;
    descricao?: string;
    criacao: string;
    cobsv: Array<{
      criacao: string;
      txid: string;
      status: StatusPixReceived;
    }>;
  }>;
}>;

/**
 * *POST /v2/gn/split/config*
 *
 * *Params*
 */
export type PixSplitConfigParams = {};

/**
 * *POST /v2/gn/split/config*
 *
 * *Body*
 */
export type PixSplitConfigBody = {
  descricao?: string;
  txid?: string;
  lancamento: {
    imediato: boolean;
  };
  split: {
    divisaoTarifa: string;
    minhaParte: {
      tipo: string;
      valor: string;
    };
    repasses: Array<{
      tipo: string;
      valor: string;
      favorecido: {
        cpf?: string;
        cnpj?: string;
        conta: string;
      };
    }>;
  };
};

/**
 * *POST /v2/gn/split/config*
 *
 * *Response*
 */
export type PixSplitConfigResponse = Promise<{
  id: string;
  status: string;
  txid?: string;
  descricao?: string;
  lancamento: {
    imediato: boolean;
  };
  split: {
    divisaoTarifa: string;
    minhaParte: {
      tipo: string;
      valor: string;
    };
    repasses: Array<{
      tipo: string;
      valor: string;
      favorecido: {
        conta: string;
        cpf?: string;
        cnpj?: string;
      };
    }>;
  };
}>;

/**
 * *PUT /v2/gn/split/config/:id*
 *
 * *Params*
 */
export type PixSplitConfigIdParams = {
  id: string;
};

/**
 * *PUT /v2/gn/split/config/:id*
 *
 * *Body*
 */
export type PixSplitConfigIdBody = {
  descricao?: string;
  txid?: string;
  lancamento: {
    imediato: boolean;
  };
  split: {
    divisaoTarifa: string;
    minhaParte: {
      tipo: string;
      valor: string;
    };
    repasses: Array<{
      tipo: string;
      valor: string;
      favorecido: {
        cpf?: string;
        cnpj?: string;
        conta: string;
      };
    }>;
  };
};

/**
 * *PUT /v2/gn/split/config/:id*
 *
 * *Response*
 */
export type PixSplitConfigIdResponse = Promise<{
  id: string;
  status: string;
  txid?: string;
  descricao: string;
  lancamento: {
    imediato: boolean;
  };
  split: {
    divisaoTarifa: string;
    minhaParte: {
      tipo: string;
      valor: string;
    };
    repasses: Array<{
      tipo: string;
      valor: string;
      favorecido: {
        conta: string;
        cpf?: string;
        cnpj?: string;
      };
    }>;
  };
}>;

/**
 * *GET /v2/gn/split/config/:id*
 *
 * *Params*
 */
export type PixSplitDetailConfigParams = {
  id: string;
};

/**
 * *GET /v2/gn/split/config/:id*
 *
 * *Body*
 */
export type PixSplitDetailConfigBody = {};

/**
 * *GET /v2/gn/split/config/:id*
 *
 * *Response*
 */
export type PixSplitDetailConfigResponse = Promise<{
  id: string;
  txid?: string;
  status: string;
  revisao: number;
  descricao: string;
  lancamento: {
    imediato: boolean;
  };
  split: {
    divisaoTarifa: string;
    minhaParte: {
      tipo: string;
      valor: string;
    };
    repasses: Array<{
      tipo: string;
      valor: string;
      favorecido: {
        conta: string;
        cpf?: string;
        cnpj?: string;
      };
    }>;
  };
}>;

/**
 * *PUT /v2/gn/split/cob/:txid/vinculo/:splitConfigId*
 *
 * *Params*
 */
export type PixSplitLinkChargeParams = {
  txid: string;
  splitConfigId: string;
};

/**
 * *PUT /v2/gn/split/cob/:txid/vinculo/:splitConfigId*
 *
 * *Body*
 */
export type PixSplitLinkChargeBody = {};

/**
 * *PUT /v2/gn/split/cob/:txid/vinculo/:splitConfigId*
 *
 * *Response*
 */
export type PixSplitLinkChargeResponse = void;

/**
 * *PUT /v2/gn/split/cobv/:txid/vinculo/:splitConfigId*
 *
 * *Params*
 */
export type PixSplitLinkDueChargeParams = {
  txid: string;
  splitConfigId: string;
};

/**
 * *PUT /v2/gn/split/cobv/:txid/vinculo/:splitConfigId*
 *
 * *Body*
 */
export type PixSplitLinkDueChargeBody = {};

/**
 * *PUT /v2/gn/split/cobv/:txid/vinculo/:splitConfigId*
 *
 * *Response*
 */
export type PixSplitLinkDueChargeResponse = void;

/**
 * *DELETE /v2/gn/split/cob/:txid/vinculo*
 *
 * *Params*
 */
export type PixSplitUnlinkChargeParams = {
  txid: string;
};

/**
 * *DELETE /v2/gn/split/cob/:txid/vinculo*
 *
 * *Body*
 */
export type PixSplitUnlinkChargeBody = {};

/**
 * *DELETE /v2/gn/split/cob/:txid/vinculo*
 *
 * *Response*
 */
export type PixSplitUnlinkChargeResponse = void;

/**
 * *DELETE /v2/gn/split/cobv/:txid/vinculo*
 *
 * *Params*
 */
export type PixSplitUnlinkDueChargeParams = {
  txid: string;
};

/**
 * *DELETE /v2/gn/split/cobv/:txid/vinculo*
 *
 * *Body*
 */
export type PixSplitUnlinkDueChargeBody = {};

/**
 * *DELETE /v2/gn/split/cobv/:txid/vinculo*
 *
 * *Response*
 */
export type PixSplitUnlinkDueChargeResponse = void;

/**
 * *GET /v2/gn/split/cob/:txid*
 *
 * *Params*
 */
export type PixSplitDetailChargeParams = {
  txid: string;
};

/**
 * *GET /v2/gn/split/cob/:txid*
 *
 * *Body*
 */
export type PixSplitDetailChargeBody = {};

/**
 * *GET /v2/gn/split/cob/:txid*
 *
 * *Response*
 */
export type PixSplitDetailChargeResponse = Promise<{
  calendario: {
    criacao: string;
    expiracao: number;
  };
  txid: string;
  revisao: number;
  status: string;
  valor: {
    original: string;
  };
  chave: string;
  devedor?: {
    cpf?: string;
    cnpj?: string;
    nome: string;
  };
  solicitacaoPagador?: string;
  loc: {
    id: number;
    location: string;
    tipoCob: TipoCob;
    criacao: string;
  };
  location: string;
  pixCopiaECola: string;
  config: {
    id: string;
    status: string;
    revisao: number;
    descricao?: string;
    tipo: string;
  };
}>;

/**
 * *GET /v2/gn/split/cobv/:txid*
 *
 * *Params*
 */
export type PixSplitDetailDueChargeParams = {
  txid: string;
};

/**
 * *GET /v2/gn/split/cobv/:txid*
 *
 * *Body*
 */
export type PixSplitDetailDueChargeBody = {};

/**
 * *GET /v2/gn/split/cobv/:txid*
 *
 * *Response*
 */
export type PixSplitDetailDueChargeResponse = Promise<{
  calendario: {
    criacao: string;
    dataDeVencimento: string;
    validadeAposVencimento?: number;
  };
  txid: string;
  revisao: number;
  loc: {
    id: number;
    location: string;
    tipoCob: TipoCob;
  };
  status: StatusPixReceived;
  devedor: {
    logradouro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    cpf?: string;
    cnpj?: string;
    nome: string;
  };
  recebedor: {
    logradouro: string;
    cidade: string;
    uf: string;
    cep: string;
    cnpj?: string;
    cpf?: string;
    nome: string;
  };
  valor: {
    original: string;
    juros?: {
      modalidade: number;
      valorPerc: string;
    };
    multa?: {
      modalidade: number;
      valorPerc: string;
    };
    desconto?: {
      modalidade: number;
      valorPerc?: string;
      descontoDataFixa?: Array<{
        data: string;
        valorPerc: string;
      }>;
    };
    abatimento?: {
      modalidade: number;
      valorPerc: string;
    };
  };
  chave: string;
  solicitacaoPagador?: string;
  config: {
    id: string;
    status: string;
    descricao?: string;
  };
  pixCopiaECola: string;
}>;

/**
 * *PUT /v2/webhook/:chave*
 *
 * *Params*
 */
export type PixConfigWebhookParams = {
  chave: string;
};

/**
 * *PUT /v2/webhook/:chave*
 *
 * *Body*
 */
export type PixConfigWebhookBody = {
  webhookUrl: string;
};

/**
 * *PUT /v2/webhook/:chave*
 *
 * *Response*
 */
export type PixConfigWebhookResponse = {
  webhookUrl: string;
};

/**
 * *GET /v2/webhook/:chave*
 *
 * *Params*
 */
export type PixDetailWebhookParams = {
  chave: string;
};

/**
 * *GET /v2/webhook/:chave*
 *
 * *Body*
 */
export type PixDetailWebhookBody = {};

/**
 * *GET /v2/webhook/:chave*
 *
 * *Response*
 */
export type PixDetailWebhookResponse = Promise<{
  webhookUrl: string;
  chave: string;
  criacao: string;
}>;

/**
 * *GET /v2/webhook*
 *
 * *Params*
 */
export type PixListWebhookParams = {
  inicio: string;
  fim: string;
};

/**
 * *GET /v2/webhook*
 *
 * *Body*
 */
export type PixListWebhookBody = {};

/**
 * *GET /v2/webhook*
 *
 * *Response*
 */
export type PixListWebhookResponse = Promise<{
  parametros: {
    inicio: string;
    fim: string;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  webhooks: Array<{
    webhookUrl: string;
    chave: string;
    criacao: string;
  }>;
}>;

/**
 * *DELETE /v2/webhook/:chave*
 *
 * *Params*
 */
export type PixDeleteWebhookParams = {
  chave: string;
};

/**
 * *DELETE /v2/webhook/:chave*
 *
 * *Body*
 */
export type PixDeleteWebhookBody = {};

/**
 * *DELETE /v2/webhook/:chave*
 *
 * *Response*
 */
export type PixDeleteWebhookResponse = void;

/**
 * *POST /v2/gn/evp*
 *
 * *Params*
 */
export type PixCreateEvpParams = {};

/**
 * *POST /v2/gn/evp*
 *
 * *Body*
 */
export type PixCreateEvpBody = {};

/**
 * *POST /v2/gn/evp*
 *
 * *Response*
 */
export type PixCreateEvpResponse = Promise<{
  chave: string;
}>;

/**
 * *GET /v2/gn/evp*
 *
 * *Params*
 */
export type PixListEvpParams = {};

/**
 * *GET /v2/gn/evp*
 *
 * *Body*
 */
export type PixListEvpBody = {};

/**
 * *GET /v2/gn/evp*
 *
 * *Response*
 */
export type PixListEvpResponse = Promise<{
  chaves: string[];
}>;

/**
 * *DELETE /v2/gn/evp/:chave*
 *
 * *Params*
 */
export type PixDeleteEvpParams = {
  chave: string;
};

/**
 * *DELETE /v2/gn/evp/:chave*
 *
 * *Body*
 */
export type PixDeleteEvpBody = {};

/**
 * *DELETE /v2/gn/evp/:chave*
 *
 * *Response*
 */
export type PixDeleteEvpResponse = void;

/**
 * *GET /v2/gn/saldo*
 *
 * *Params*
 */
export type GetAccountBalanceParams = {};

/**
 * *GET /v2/gn/saldo*
 *
 * *Body*
 */
export type GetAccountBalanceBody = {};

/**
 * *GET /v2/gn/saldo*
 *
 * *Response*
 */
export type GetAccountBalanceResponse = Promise<{
  saldo: string;
  bloqueios?: {
    judicial: string;
    med: string;
    total: string;
  };
}>;

/**
 * *PUT /v2/gn/config*
 *
 * *Params*
 */
export type UpdateAccountConfigParams = {};

/**
 * *PUT /v2/gn/config*
 *
 * *Body*
 */
export type UpdateAccountConfigBody = {
  pix: {
    receberSemChave: boolean;
    chaves?: Record<
      string,
      {
        recebimento: {
          txidObrigatorio: boolean;
          recusarTipoPessoa?: string;
          qrCodeEstatico: {
            recusarTodos: boolean;
          };
          documentoPagadorIgualDevedor?: boolean
          webhook?: {
            notificacao?: {
              tarifa: boolean;
              pagador: boolean;
            };
            notificar?: {
              pixSemTxid: boolean;
            };
          };
        };
        envio?: {
          webhook: {
            notificacao: {
              tarifa: boolean;
              favorecido: boolean;
            };
          };
        };
      }
    >;
  };
};

/**
 * *PUT /v2/gn/config*
 *
 * *Response*
 */
export type UpdateAccountConfigResponse = void;

/**
 * *GET /v2/gn/config*
 *
 * *Params*
 */
export type ListAccountConfigParams = {};

/**
 * *GET /v2/gn/config*
 *
 * *Body*
 */
export type ListAccountConfigBody = {};

/**
 * *GET /v2/gn/config*
 *
 * *Response*
 */
export type ListAccountConfigResponse = Promise<{
  pix: {
    receberSemChave: boolean;
    chaves?: Map<
      string,
      {
        recebimento: {
          txidObrigatorio: boolean;
          recusarTipoPessoa?: string;
          qrCodeEstatico: {
            recusarTodos: boolean;
          };
          documentoPagadorIgualDevedor: boolean;
          webhook?: {
            notificacao?: {
              tarifa: boolean;
              pagador: boolean;
            };
            notificar?: {
              pixSemTxid: boolean;
            };
          };
        };
        envio?: {
          webhook: {
            notificacao: {
              tarifa: boolean;
              favorecido: boolean;
            };
          };
        };
      }
    >;
  };
}>;

/**
 * *GET /v2/gn/infracoes*
 *
 * *Params*
 */
export type MedListParams = {
  inicio: string;
  fim: string;
};

/**
 * *GET /v2/gn/infracoes*
 *
 * *Body*
 */
export type MedListBody = {};

/**
 * *GET /v2/gn/infracoes*
 *
 * *Response*
 */
export type MedListResponse = Promise<{
  parametros: {
    inicio: string;
    fim: string;
    paginacao: {
      paginaAtual: number;
      itensPorPagina: number;
      quantidadeDePaginas: number;
      quantidadeTotalDeItens: number;
    };
  };
  infracoes: Array<{
    idInfracao: string;
    endToEndId: string;
    protocolo: string;
    dataTransacao: string;
    valor: string;
    chave?: string;
    status: StatusMed;
    razao: string;
    tipoSituacao?: TipoSituacaoMed
    tipoFraude?: string;
    comentario?: string;
    defesa?: string;
    justificativaAnalista?: string;
    identificadorTicket: Array<number>;
    dadosAnalise: {
      abertura: string;
      prazoFinalizacao: string;
      recebimentoDefesa?: string;
      finalizacao?: string;
    };
    origem: {
      nomeParticipante: string;
      conta: string;
      nome: string;
      documento: string;
    };
    destino: {
      nomeParticipante: string;
      conta: string;
      nome: string;
      documento: string;
    };
    criadoEm: string;
    atualizadoEm: string;
  }>;
}>;

/**
 * *POST /v2/gn/infracoes/:idInfracao/defesa*
 *
 * *Params*
 */
export type MedDefenseParams = {
  idInfracao: string;
};

/**
 * *POST /v2/gn/infracoes/:idInfracao/defesa*
 *
 * *Body*
 */
export type MedDefenseBody = {
  analise: "aceito" | "rejeitado";
  justificativa: string;
};

/**
 * *POST /v2/gn/infracoes/:idInfracao/defesa*
 *
 * *Response*
 */
export type MedDefenseResponse = void;

/**
 * *POST /v2/gn/relatorios/extrato-conciliacao*
 *
 * *Params*
 */
export type CreateReportParams = {};

/**
 * *POST /v2/gn/relatorios/extrato-conciliacao*
 *
 * *Body*
 */
export type CreateReportBody = {
  dataMovimento: string;
  tipoRegistros: {
    pixRecebido?: boolean;
    pixEnviadoChave?: boolean;
    pixEnviadoDadosBancarios?: boolean;
    estornoPixEnviado?: boolean;
    pixDevolucaoEnviada?: boolean;
    pixDevolucaoRecebida?: boolean;
    tarifaPixEnviado?: boolean;
    tarifaPixRecebido?: boolean;
    estornoTarifaPixEnviado?: boolean;
    saldoDiaAnterior?: boolean;
    saldoDia?: boolean;
    transferenciaEnviada?: boolean;
    transferenciaRecebida?: boolean;
    estornoTransferenciaEnviada?: boolean;
    tarifaTransferenciaEnviada?: boolean;
    estornoTarifaTransferenciaEnviada?: boolean;
    estornoTarifaPixRecebido?: boolean;
  };
};

/**
 * *POST /v2/gn/relatorios/extrato-conciliacao*
 *
 * *Response*
 */
export type CreateReportResponse = Promise<{
  id: string;
  dataSolicitacao: string;
  status: StatusReport;
}>;

/**
 * *GET /v2/gn/relatorios/:id*
 *
 * *Params*
 */
export type DetailReportParams = {
  id: string;
};

/**
 * *GET /v2/gn/relatorios/:id*
 *
 * *Body*
 */
export type DetailReportBody = {};

/**
 * *GET /v2/gn/relatorios/:id*
 *
 * *Response*
 *
 * Retorna string (CSV) ou o objeto com status, caso ainda não esteja processado.
 */
export type DetailReportResponse = Promise<
  {
      id: string;
      dataSolicitacao: string;
      status: StatusReport;
  }
  | string
>;

/**
 * *POST /v2/gn/webhook/reenviar*
 *
 * *Params*
 */
export type PixResendWebhookParams = {};

/**
 * *POST /v2/gn/webhook/reenviar*
 *
 * *Body*
 */
export type PixResendWebhookBody = {
  tipo: TipoPixResendWebhook;
  e2eids: Array<string>;
};

/**
 * *POST /v2/gn/webhook/reenviar*
 *
 * *Response*
 */
export type PixResendWebhookResponse = void;


/**
 * *GET /v2/gn/pix/comprovantes*
 * 
 * *Params*
 */
export type PixGetReceiptParams = {
  e2eid?: string;
  idEnvio?: string;
  rtrId?: string;
  txid?: string;
};

/**
 * *GET /v2/gn/pix/comprovantes*
 * 
 * *Body*
 */
export type PixGetReceiptBody = {};

/**
 * *GET /v2/gn/pix/comprovantes*
 * 
 * *Response*
 */
export type PixGetReceiptResponse = Buffer
