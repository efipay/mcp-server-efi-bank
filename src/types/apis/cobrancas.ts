/**
 * *POST /v1/charge/one-step*
 *
 * *Params*
 */
export type CreateOneStepChargeParams = {}

/**
 * *POST /v1/charge/one-step*
 *
 * *Body*
 */
export type CreateOneStepChargeBody = {
  items: Array<{
    name: string
    value: number
    amount: number
    marketplace?: {
      mode?: string
      repasses: Array<{
        payee_code: string
        percentage?: number
        fixed?: number
      }>
    }
  }>
  shippings?: Array<{
    name: string
    value: number
    payee_code?: string
  }>
  metadata?: {
    custom_id?: string
    notification_url?: string
  }
  payment: {
    banking_billet?: {
      customer: {
        name?: string
        cpf?: string
        email?: string
        phone_number?: string
        birth?: string
        address?: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: {
          corporate_name: string
          cnpj: string
        }
      }
      expire_at: string
      discount?: {
        type: 'percentage' | 'currency'
        value: number
      }
      conditional_discount?: {
        type: 'percentage' | 'currency'
        value: number
        until_date: string
      }
      configurations?: {
        days_to_write_off?: number
        fine?: number
        interest?:
          | {
              value: number
              type: 'monthly' | 'daily'
            }
          | number
      }
      message?: string
    }
    credit_card?: {
      customer: {
        name: string
        cpf: string
        email: string
        phone_number?: string
        birth?: string
        address?: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: {
          corporate_name: string
          cnpj: string
        }
      }
      installments: number
      discount?: {
        type: 'percentage' | 'currency'
        value: number
      }
      billing_address?: {
        street: string
        number: string
        neighborhood: string
        zipcode: string
        city: string
        complement?: string
        state: string
      }
      payment_token: string
      message?: string
    }
  }
}

/**
 * *POST /v1/charge/one-step*
 *
 * *Response*
 */
export type CreateOneStepChargeResponse = Promise<{
  code: number
  data: {
    charge_id: number
    total: number
    status: string
    barcode?: string
    pix?: {
      qrcode: string
      qrcode_image: string
    }
    link?: string
    billet_link?: string
    pdf?: {
      charge: string
    }
    expire_at?: string
    installments?: number
    installment_value?: number
    refusal?: {
      reason: string
      retry: boolean
    }
    payment: string
  }
}>

/**
 * *POST /v1/charge*
 *
 * *Params*
 */
export type CreateChargeParams = {}

/**
 * *POST /v1/charge*
 *
 * *Body*
 */
export type CreateChargeBody = {
  items: Array<{
    name: string
    value: number
    amount: number
    marketplace?: {
      payee_code: string
      percentage?: number
    }
  }>
  shippings?: Array<{
    name: string
    value: number
    payee_code?: string
  }>
  metadata?: {
    custom_id?: string
    notification_url?: string
  }
}

/**
 * *POST /v1/charge*
 *
 * *Response*
 */
export type CreateChargeResponse = Promise<{
  code: number
  data: {
    charge_id: number
    total: number
    status: string
    custom_id: string | null
    created_at: string
  }
}>

/**
 * *POST /v1/charge/:id/pay*
 *
 * *Params*
 */
export type DefinePayMethodParams = { id: number }

/**
 * *POST /v1/charge/:id/pay*
 *
 * *Body*
 */
export type DefinePayMethodBody = {
  payment: {
    banking_billet?: {
      customer: {
        name?: string
        cpf?: string
        email: string
        phone_number?: string
        birth?: string
        address: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: {
          corporate_name: string
          cnpj: string
        }
      }
      expire_at: string
      discount?: {
        type: 'percentage' | 'currency'
        value: number
      }
      conditional_discount?: {
        type: 'percentage' | 'currency'
        value: number
        until_date: string
      }
      configurations?: {
        days_to_write_off?: number
        fine?: number
        interest?:
          | {
              value: number
              type: 'monthly' | 'daily'
            }
          | number
      }
      message?: string
    }
    credit_card?: {
      customer: {
        name?: string
        cpf?: string
        email: string
        phone_number?: string
        birth?: string
        address: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: {
          corporate_name: string
          cnpj: string
        }
      }
      installments: number
      discount?: {
        type: 'percentage' | 'currency'
        value: number
      }
      billing_address: {
        street: string
        number: string
        neighborhood: string
        zipcode: string
        city: string
        complement?: string
        state: string
      }
      payment_token: string
      message?: string
    }
  }
}

/**
 * *POST /v1/charge/:id/pay*
 *
 * *Response*
 */
export type DefinePayMethodResponse = Promise<{
  code: number
  data: {
    charge_id: number
    total: number
    status: string
    reason?: string | null
    payment: string
    barcode: string
    pix?: {
      qrcode: string
      qrcode_image: string
    }
    link?: string
    pdf?: {
      charge: string
    }
    expire_at?: string
    configurations?: {
      days_to_write_off: number
      interest_type?: 'monthly' | 'daily'
      interest?: number
      fine?: number
    }
    installments?: number
    installment_value?: number
  }
}>

/**
 * *GET /v1/charge/:id*
 *
 * *Params*
 */
export type DetailChargeParams = { id: number }

/**
 * *GET /v1/charge/:id*
 *
 * *Body*
 */
export type DetailChargeBody = {}

/**
 * *GET /v1/charge/:id*
 *
 * *Response*
 */
export type DetailChargeResponse = Promise<{
  code: number
  data: {
    charge_id: number
    total: number
    status: string
    reason?: string
    custom_id: string | null
    created_at: string
    notification_url: string | null
    items: Array<{
      name: string
      value: number
      amount: number
    }>
    shippings?: Array<{
      name: string
      value: number
      payee_code: string
    }>
    history: Array<{
      message: string
      created_at: string
    }>
    customer?: {
      name: string | null
      cpf: string | null
      birth?: string
      email?: string
      phone_number?: string
      address?: {
        street: string
        number: string
        complement: string | null
        neighborhood: string
        city: string
        state: string
        zipcode: string
      }
    }
    payment?: {
      method: string
      created_at: string
      message: string | null
      banking_billet?: {
        barcode: string
        pix?: {
          qrcode: string
          qrcode_image: string
        }
        link: string
        pdf: {
          charge: string
        }
        expire_at: string
      }
      credit_card?: {
        mask: string
        installments: number
        installment_value: number
        address: {
          street: string
          number: string
          complement: string | null
          neighborhood: string
          city: string
          state: string
          zipcode: string
        }
      }
      carnet?: {
        parcel: number
        barcode: string
        pix?: {
          qrcode: string
          qrcode_image: string
        }
        url: string
        parcel_link: string
        pdf: {
          charge: string
        }
        expire_at: string
        configurations?: {
          days_to_write_off?: number
          interest_type?: 'monthly' | 'daily'
          interest?: number
          fine?: number
        }
      }
    }
    link?: {
      billet_discount: number | null
      card_discount: number | null
      conditional_discount_value: number | null
      conditional_discount_type: string | null
      conditional_discount_date: string | null
      message: string | null
      expire_at: string
      request_delivery_address: boolean
      payment_method: string
      payment_url: string
    }
  }
}>

/**
 * *GET /v1/charges*
 *
 * *Params*
 */
export type ListChargesParams = {
  begin_date: string
  end_date: string
  charge_type: 'billet' | 'card' | 'carnet' | 'subscription'
  status?: 'new' | 'waiting' | 'link' | 'paid' | 'unpaid' | 'canceled' | 'identified' | 'settled'
  date_of?: 'creation' | 'payment' | 'expired'
  customer_document?: string
  custom_id?: string
  value?: number
  limit?: number
  page?: number
  offset?: number
}

/**
 * *GET /v1/charges*
 *
 * *Body*
 */
export type ListChargesBody = {}

/**
 * *GET /v1/charges*
 *
 * *Response*
 */
export type ListChargesResponse = Promise<{
  code: number
  data: Array<{
    id: number
    total: number
    status: string
    custom_id: string | null
    created_at: string
    customer: {
      phone_number: string | null
      cnpj?: string
      cpf?: string
      name?: string
      corporate_name?: string
    }
    payment?: {
      payment_method: string
      paid_at: string | null
      pix?: {
        qrcode: string
        qrcode_image: string
      }
      banking_billet?: {
        barcode: string
        link: string
        expire_at: string
        pdf: {
          charge: string
        }
      }
      carnet?: {
        parcel: number
        barcode: string
        expire_at: string
        link: string
        configurations: {
          days_to_write_off: number
          interest_type?: 'monthly' | 'daily'
          interest: number
          fine: number
        }
        pdf: {
          charge: string
        }
      }
    }
    link?: {
      billet_discount: number | null
      card_discount: number | null
      conditional_discount_value: number | null
      conditional_discount_type: 'percentage' | 'currency' | null
      conditional_discount_date: string | null
      message: string | null
      expire_at: string
      request_delivery_address: boolean
      payment_method: 'banking_billet' | 'credit_card' | 'all'
      payment_url: string
    }
  }>
}>

/**
 * *PUT /v1/charge/:id/metadata*
 *
 * *Params*
 */
export type UpdateChargeMetadataParams = { id: number }

/**
 * *PUT /v1/charge/:id/metadata*
 *
 * *Body*
 */
export type UpdateChargeMetadataBody = {
  notification_url?: string
  custom_id?: string
  resend?: boolean
}

/**
 * *PUT /v1/charge/:id/metadata*
 *
 * *Response*
 */
export type UpdateChargeMetadataResponse = { code: number }

/**
 * *PUT /v1/charge/:id/billet*
 *
 * *Params*
 */
export type UpdateBilletParams = { id: number }

/**
 * *PUT /v1/charge/:id/billet*
 *
 * *Body*
 */
export type UpdateBilletBody = { expire_at: string }

/**
 * *PUT /v1/charge/:id/billet*
 *
 * *Response*
 */
export type UpdateBilletResponse = { code: number }

/**
 * *PUT /v1/charge/:id/cancel*
 *
 * *Params*
 */
export type CancelChargeParams = { id: number }

/**
 * *PUT /v1/charge/:id/cancel*
 *
 * *Body*
 */
export type CancelChargeBody = {}

/**
 * *PUT /v1/charge/:id/cancel*
 *
 * *Response*
 */
export type CancelChargeResponse = { code: number }

/**
 * *POST /v1/charge/:id/billet/resend*
 *
 * *Params*
 */
export type SendBilletEmailParams = { id: number }

/**
 * *POST /v1/charge/:id/billet/resend*
 *
 * *Body*
 */
export type SendBilletEmailBody = { email: string }

/**
 * *POST /v1/charge/:id/billet/resend*
 *
 * *Response*
 */
export type SendBilletEmailResponse = { code: number }

/**
 * *POST /v1/charge/:id/history*
 *
 * *Params*
 */
export type CreateChargeHistoryParams = { id: number }

/**
 * *POST /v1/charge/:id/history*
 *
 * *Body*
 */
export type CreateChargeHistoryBody = { description: string }

/**
 * *POST /v1/charge/:id/history*
 *
 * *Response*
 */
export type CreateChargeHistoryResponse = { code: number }

/**
 * *POST /v1/charge/:id/balance-sheet*
 *
 * *Params*
 */
export type DefineBalanceSheetBilletParams = { id: number }

/**
 * *POST /v1/charge/:id/balance-sheet*
 *
 * *Body*
 */
export type DefineBalanceSheetBilletBody = {
  title: string
  body: Array<{
    header: string
    tables: Array<{
      rows: Array<
        Array<{
          align: string
          color: string
          style: string
          text: string
          colspan: number
        }>
      >
    }>
  }>
}

/**
 * *POST /v1/charge/:id/balance-sheet*
 *
 * *Response*
 */
export type DefineBalanceSheetBilletResponse = { code: number }

/**
 * *PUT /v1/charge/:id/settle*
 *
 * *Params*
 */
export type SettleChargeParams = { id: number }

/**
 * *PUT /v1/charge/:id/settle*
 *
 * *Body*
 */
export type SettleChargeBody = {}

/**
 * *PUT /v1/charge/:id/settle*
 *
 * *Response*
 */
export type SettleChargeResponse = { code: number }

/**
 * *POST /v1/charge/:id/retry*
 *
 * *Params*
 */
export type CardPaymentRetryParams = { id: number }

/**
 * *POST /v1/charge/:id/retry*
 *
 * *Body*
 */
export type CardPaymentRetryBody = {
  payment: {
    credit_card: {
      customer: {
        name?: string
        cpf?: string
        email: string
        birth: string
        phone_number?: string
        juridical_person?: {
          corporate_name: string
          cnpj: string
        }
      }
      billing_address: {
        street: string
        number: string
        neighborhood: string
        zipcode: string
        city: string
        complement: string
        state: string
      }
      payment_token: string
    }
  }
}

/**
 * *POST /v1/charge/:id/retry*
 *
 * *Response*
 */
export type CardPaymentRetryResponse = Promise<{
  code: number
  data: {
    installments: number
    installment_value: number
    charge_id: number
    status: string
    total: number
    payment: string
  }
}>

/**
 * *POST /v1/charge/card/:id/refund*
 *
 * *Params*
 */
export type RefundCardParams = { id: number }

/**
 * *POST /v1/charge/card/:id/refund*
 *
 * *Body*
 */
export type RefundCardBody = { amount?: number }

/**
 * *POST /v1/charge/card/:id/refund*
 *
 * *Response*
 */
export type RefundCardResponse = Promise<{
  code: number
  message: string
}>

/* -------------------------------------------------------------------------- */
/*                              CARNET ENDPOINTS                              */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/carnet*
 *
 * *Params*
 */
export type CreateCarnetParams = {}

/**
 * *POST /v1/carnet*
 *
 * *Body*
 */
export type CreateCarnetBody = {
  items: Array<{
    name: string
    value: number
    amount: number
  }>
  customer: {
    name?: string
    cpf?: string
    email?: string
    phone_number?: string
    birth?: string
    address?: {
      street: string
      number: string
      neighborhood: string
      zipcode: string
      city: string
      complement?: string
      state: string
    }
    juridical_person?: {
      corporate_name: string
      cnpj: string
    }
  }
  expire_at: string
  repeats: number
  split_items?: boolean
  metadata?: {
    custom_id?: string
    notification_url?: string
  }
  configurations?: {
    fine?: number
    interest?:
      | {
          value: number
          type: 'monthly' | 'daily'
        }
      | number
  }
  message?: string
  discount?: {
    type: 'percentage' | 'currency'
    value: number
  }
  conditional_discount?: {
    type: 'percentage' | 'currency'
    value: number
    until_date: string
  }
}

/**
 * *POST /v1/carnet*
 *
 * *Response*
 */
export type CreateCarnetResponse = Promise<{
  code: number
  data: {
    carnet_id: number
    status: string
    cover: string
    link: string
    carnet_link: string
    pdf: {
      carnet: string
      cover: string
    }
    charges: Array<{
      charge_id: number
      parcel: string
      status: string
      value: number
      expire_at: string
      url: string
      parcel_link: string
      pdf: { charge: string }
      barcode: string
      pix?: { qrcode: string; qrcode_image: string }
    }>
  }
}>

/**
 * *GET /v1/carnet/:id*
 *
 * *Params*
 */
export type DetailCarnetParams = { id: number }

/**
 * *GET /v1/carnet/:id*
 *
 * *Body*
 */
export type DetailCarnetBody = {}

/**
 * *GET /v1/carnet/:id*
 *
 * *Response*
 */
export type DetailCarnetResponse = Promise<{
  code: number
  data: {
    carnet_id: number
    status: string
    repeats: number
    cover: string
    link: string
    pdf: { carnet: string; cover: string }
    value: number
    custom_id: string | null
    notification_url: string | null
    split_items: boolean
    charges: Array<{
      charge_id: number
      status: string
      url: string
      pdf: { charge: string }
      barcode: string
      pix: { qrcode: string; qrcode_image: string }
      parcel: number
      expire_at: string
      configurations?: {
        days_to_write_off?: number
        interest_type?: 'monthly' | 'daily'
        interest?: number
        fine?: number
      }
    }>
    created_at: string
    history: Array<{ message: string; created_at: string }>
  }
}>

/**
 * *PUT /v1/carnet/:id/metadata*
 *
 * *Params*
 */
export type UpdateCarnetMetadataParams = { id: number }

/**
 * *PUT /v1/carnet/:id/metadata*
 *
 * *Body*
 */
export type UpdateCarnetMetadataBody = {
  notification_url?: string
  custom_id?: string
  resend?: boolean
}

/**
 * *PUT /v1/carnet/:id/metadata*
 *
 * *Response*
 */
export type UpdateCarnetMetadataResponse = { code: number }

/**
 * *PUT /v1/carnet/:id/parcel/:parcel*
 *
 * *Params*
 */
export type UpdateCarnetParcelParams = { id: number; parcel: number }

/**
 * *PUT /v1/carnet/:id/parcel/:parcel*
 *
 * *Body*
 */
export type UpdateCarnetParcelBody = { expire_at: string }

/**
 * *PUT /v1/carnet/:id/parcel/:parcel*
 *
 * *Response*
 */
export type UpdateCarnetParcelResponse = { code: number }

/**
 * *PUT /v1/carnet/:id/parcels*
 *
 * *Params*
 */
export type UpdateCarnetParcelsParams = { id: number }

/**
 * *PUT /v1/carnet/:id/parcels*
 *
 * *Body*
 */
export type UpdateCarnetParcelsBody = { expire_at: string }

/**
 * *PUT /v1/carnet/:id/parcels*
 *
 * *Response*
 */
export type UpdateCarnetParcelsResponse = { code: number }

/**
 * *PUT /v1/carnet/:id/cancel*
 *
 * *Params*
 */
export type CancelCarnetParams = { id: number }

/**
 * *PUT /v1/carnet/:id/cancel*
 *
 * *Body*
 */
export type CancelCarnetBody = {}

/**
 * *PUT /v1/carnet/:id/cancel*
 *
 * *Response*
 */
export type CancelCarnetResponse = { code: number }

/**
 * *PUT /v1/carnet/:id/parcel/:parcel/cancel*
 *
 * *Params*
 */
export type CancelCarnetParcelParams = { id: number; parcel: number }

/**
 * *PUT /v1/carnet/:id/parcel/:parcel/cancel*
 *
 * *Body*
 */
export type CancelCarnetParcelBody = {}

/**
 * *PUT /v1/carnet/:id/parcel/:parcel/cancel*
 *
 * *Response*
 */
export type CancelCarnetParcelResponse = { code: number }

/**
 * *POST /v1/carnet/:id/resend*
 *
 * *Params*
 */
export type SendCarnetEmailParams = { id: number }

/**
 * *POST /v1/carnet/:id/resend*
 *
 * *Body*
 */
export type SendCarnetEmailBody = { email: string }

/**
 * *POST /v1/carnet/:id/resend*
 *
 * *Response*
 */
export type SendCarnetEmailResponse = { code: number }

/**
 * *POST /v1/carnet/:id/parcel/:parcel/resend*
 *
 * *Params*
 */
export type SendCarnetParcelEmailParams = { id: number; parcel: number }

/**
 * *POST /v1/carnet/:id/parcel/:parcel/resend*
 *
 * *Body*
 */
export type SendCarnetParcelEmailBody = { email: string }

/**
 * *POST /v1/carnet/:id/parcel/:parcel/resend*
 *
 * *Response*
 */
export type SendCarnetParcelEmailResponse = { code: number }

/**
 * *POST /v1/carnet/:id/history*
 *
 * *Params*
 */
export type CreateCarnetHistoryParams = { id: number }

/**
 * *POST /v1/carnet/:id/history*
 *
 * *Body*
 */
export type CreateCarnetHistoryBody = { description: string }

/**
 * *POST /v1/carnet/:id/history*
 *
 * *Response*
 */
export type CreateCarnetHistoryResponse = { code: number }

/**
 * *PUT /v1/carnet/:id/settle*
 *
 * *Params*
 */
export type SettleCarnetParams = { id: number }

/**
 * *PUT /v1/carnet/:id/settle*
 *
 * *Body*
 */
export type SettleCarnetBody = {}

/**
 * *PUT /v1/carnet/:id/settle*
 *
 * *Response*
 */
export type SettleCarnetResponse = { code: number }

/**
 * *PUT /v1/carnet/:id/parcel/:parcel/settle*
 *
 * *Params*
 */
export type SettleCarnetParcelParams = { id: number; parcel: number }

/**
 * *PUT /v1/carnet/:id/parcel/:parcel/settle*
 *
 * *Body*
 */
export type SettleCarnetParcelBody = {}

/**
 * *PUT /v1/carnet/:id/parcel/:parcel/settle*
 *
 * *Response*
 */
export type SettleCarnetParcelResponse = { code: number }

/* -------------------------------------------------------------------------- */
/*                                 PLANOS                                     */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/plan*
 *
 * *Params*
 */
export type CreatePlanParams = {}

/**
 * *POST /v1/plan*
 *
 * *Body*
 */
export type CreatePlanBody = {
  name: string
  interval: number
  repeats?: number
}

/**
 * *POST /v1/plan*
 *
 * *Response*
 */
export type CreatePlanResponse = Promise<{
  code: number
  data: {
    plan_id: number
    name: string
    interval: number
    repeats: number | null
    created_at: string
  }
}>

/**
 * *GET /v1/plans*
 *
 * *Params*
 */
export type ListPlansParams = { name?: string; limit?: number; offset?: number }

/**
 * *GET /v1/plans*
 *
 * *Body*
 */
export type ListPlansBody = {}

/**
 * *GET /v1/plans*
 *
 * *Response*
 */
export type ListPlansResponse = Promise<{
  code: number
  data: Array<{
    plan_id: number
    name: string
    interval: number
    repeats: number | null
    created_at: string
  }>
}>

/**
 * *PUT /v1/plan/:id*
 *
 * *Params*
 */
export type UpdatePlanParams = { id: number }

/**
 * *PUT /v1/plan/:id*
 *
 * *Body*
 */
export type UpdatePlanBody = { name: string }

/**
 * *PUT /v1/plan/:id*
 *
 * *Response*
 */
export type UpdatePlanResponse = { code: number }

/**
 * *DELETE /v1/plan/:id*
 *
 * *Params*
 */
export type DeletePlanParams = { id: number }

/**
 * *DELETE /v1/plan/:id*
 *
 * *Body*
 */
export type DeletePlanBody = {}

/**
 * *DELETE /v1/plan/:id*
 *
 * *Response*
 */
export type DeletePlanResponse = { code: number }

/* -------------------------------------------------------------------------- */
/*                              SUBSCRIÇÕES                                   */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/plan/:id/subscription/one-step*
 *
 * *Params*
 */
export type CreateOneStepSubscriptionParams = { id: number }

/**
 * *POST /v1/plan/:id/subscription/one-step*
 *
 * *Body*
 */
export type CreateOneStepSubscriptionBody = {
  items: Array<{
    name: string
    value: number
    amount: number
  }>
  shippings?: Array<{
    name: string
    value: number
    payee_code?: string
  }>
  metadata?: {
    custom_id?: string
    notification_url?: string
  }
  payment: {
    banking_billet?: {
      customer: {
        name?: string
        cpf?: string
        email?: string
        phone_number?: string
        birth?: string
        address?: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: {
          corporate_name: string
          cnpj: string
        }
      }
      expire_at: string
      discount?: {
        type: 'percentage' | 'currency'
        value: number
      }
      conditional_discount?: {
        type: 'percentage' | 'currency'
        value: number
        until_date: string
      }
      configurations?: {
        fine?: number
        interest?:
          | {
              value: number
              type: 'monthly' | 'daily'
            }
          | number
      }
      message?: string
    }
    credit_card?: {
      customer: {
        name?: string
        cpf?: string
        email: string
        phone_number: string
        birth: string
        address?: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: {
          corporate_name: string
          cnpj: string
        }
      }
      billing_address: {
        street: string
        number: string
        neighborhood: string
        zipcode: string
        city: string
        complement?: string
        state: string
      }
      payment_token: string
      discount?: {
        type: 'percentage' | 'currency'
        value: number
      }
      message?: string
      trial_days?: number
    }
  }
}

/**
 * *POST /v1/plan/:id/subscription/one-step*
 *
 * *Response*
 */
export type CreateOneStepSubscriptionResponse = Promise<{
  code: number
  data: {
    subscription_id: number
    status: string
    barcode?: string
    link?: string
    billet_link?: string
    pdf?: { charge: string }
    expire_at?: string
    plan: { id: number; interval: number; repeats: number | null }
    charge: { id: number; status: string; parcel: number; total: number }
    first_execution: string
    total: number
    payment: string
  }
}>

/* -------------------------------------------------------------------------- */
/*                    SUBSCRIÇÃO (criar sem One‑Step)                         */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/plan/:id/subscription*
 *
 * *Params*
 */
export type CreateSubscriptionParams = { id: number }

/**
 * *POST /v1/plan/:id/subscription*
 *
 * *Body*
 */
export type CreateSubscriptionBody = {
  items: Array<{
    name: string
    value: number
    amount: number
  }>
  shippings?: Array<{
    name: string
    value: number
    payee_code?: string
  }>
  metadata?: {
    custom_id?: string
    notification_url?: string
  }
}

/**
 * *POST /v1/plan/:id/subscription*
 *
 * *Response*
 */
export type CreateSubscriptionResponse = Promise<{
  code: number
  data: {
    subscription_id: number
    status: string
    custom_id: string | null
    charges: Array<{
      charge_id: number
      status: string
      total: number
      parcel: number
    }>
    created_at: string
  }
}>

/* -------------------------------------------------------------------------- */
/*           SUBSCRIÇÃO – Definir forma de pagamento / cliente                */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/subscription/:id/pay*
 *
 * *Params*
 */
export type DefineSubscriptionPayMethodParams = { id: number }

/**
 * *POST /v1/subscription/:id/pay*
 *
 * *Body*
 */
export type DefineSubscriptionPayMethodBody = {
  payment: {
    banking_billet?: {
      customer: {
        name?: string
        cpf?: string
        email?: string
        phone_number?: string
        birth?: string
        address?: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: { corporate_name: string; cnpj: string }
      }
      expire_at: string
      discount?: { type: 'percentage' | 'currency'; value: number }
      conditional_discount?: {
        type: 'percentage' | 'currency'
        value: number
        until_date: string
      }
      configurations?: {
        fine?: number
        interest?:
          | { value: number; type: 'monthly' | 'daily' }
          | number
      }
      message?: string
    }
    credit_card?: {
      customer: {
        name?: string
        cpf?: string
        email: string
        phone_number: string
        birth: string
        address?: {
          street: string
          number: string
          neighborhood: string
          zipcode: string
          city: string
          complement?: string
          state: string
        }
        juridical_person?: { corporate_name: string; cnpj: string }
      }
      billing_address: {
        street: string
        number: string
        neighborhood: string
        zipcode: string
        city: string
        complement?: string
        state: string
      }
      payment_token: string
      discount?: { type: 'percentage' | 'currency'; value: number }
      message?: string
      trial_days?: number
    }
  }
}

/**
 * *POST /v1/subscription/:id/pay*
 *
 * *Response*
 */
export type DefineSubscriptionPayMethodResponse = Promise<{
  code: number
  data: {
    subscription_id: number
    status: string
    barcode?: string
    link?: string
    billet_link?: string
    pdf?: { charge: string }
    expire_at?: string
    plan: { id: number; interval: number; repeats: number | null }
    charge: { id: number; status: string; parcel: number; total: number }
    first_execution: string
    total: number
    payment: string
  }
}>

/* -------------------------------------------------------------------------- */
/*                           SUBSCRIÇÃO – Detalhes                            */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/subscription/:id*
 *
 * *Params*
 */
export type DetailSubscriptionParams = { id: number }

/**
 * *GET /v1/subscription/:id*
 *
 * *Body*
 */
export type DetailSubscriptionBody = {}

/**
 * *GET /v1/subscription/:id*
 *
 * *Response*
 */
export type DetailSubscriptionResponse = Promise<{
  code: number
  data: {
    subscription_id: number
    value: number
    status: string
    custom_id: string | null
    notification_url: string | null
    payment_method: string | null
    next_execution: string | null
    next_expire_at: string | null
    plan: {
      plan_id: number
      name: string
      interval: number
      repeats: number | null
    }
    occurrences: number
    created_at: string
    history: Array<{
      charge_id: number
      status: string
      created_at: string
    }>
  }
}>

/* -------------------------------------------------------------------------- */
/*       SUBSCRIÇÃO – Link de Pagamento (One‑Step)                            */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/plan/:id/subscription/one-step/link*
 *
 * *Params*
 */
export type CreateOneStepSubscriptionLinkParams = { id: number }

/**
 * *POST /v1/plan/:id/subscription/one-step/link*
 *
 * *Body*
 */
export type CreateOneStepSubscriptionLinkBody = {
  items: Array<{
    name: string
    value: number
    amount: number
    marketplace?: { payee_code: string; percentage: number }
  }>
  shippings?: Array<{
    name: string
    value: number
    payee_code?: string
  }>
  metadata?: {
    custom_id?: string
    notification_url?: string
  }
  settings: {
    billet_discount?: number
    card_discount?: number
    conditional_discount?: {
      type: 'percentage' | 'currency'
      value: number
      until_date: string
    }
    message?: string
    expire_at: string
    request_delivery_address: boolean
    payment_method: 'banking_billet' | 'credit_card' | 'all'
  }
}

/**
 * *POST /v1/plan/:id/subscription/one-step/link*
 *
 * *Response*
 */
export type CreateOneStepSubscriptionLinkResponse = Promise<{
  code: number
  data: {
    subscription_id: number
    status: string
    custom_id: string | null
    charge: { id: number; status: string; total: number; parcel: number }
    payment_url: string
    payment_method: string
    conditional_discount_date: string | null
    request_delivery_address: boolean
    expire_at: string
    created_at: string
  }
}>

/* -------------------------------------------------------------------------- */
/*             SUBSCRIÇÃO – Metadados / Atualizar / Cancelar                  */
/* -------------------------------------------------------------------------- */

/**
 * *PUT /v1/subscription/:id/metadata*
 *
 * *Params*
 */
export type UpdateSubscriptionMetadataParams = { id: number }

/**
 * *PUT /v1/subscription/:id/metadata*
 *
 * *Body*
 */
export type UpdateSubscriptionMetadataBody = {
  notification_url?: string
  custom_id?: string
  resend?: boolean
}

/**
 * *PUT /v1/subscription/:id/metadata*
 *
 * *Response*
 */
export type UpdateSubscriptionMetadataResponse = { code: number }

/**
 * *PUT /v1/subscription/:id*
 *
 * *Params*
 */
export type UpdateSubscriptionParams = { id: number }

/**
 * *PUT /v1/subscription/:id*
 *
 * *Body*
 */
export type UpdateSubscriptionBody = {
  plan_id?: number
  customer?: { email?: string; phone_number?: string }
  items?: Array<{
    name: string
    value: number
    amount: number
  }>
  shippings?: Array<{ name: string; value: number }>
}

/**
 * *PUT /v1/subscription/:id*
 *
 * *Response*
 */
export type UpdateSubscriptionResponse = Promise<{
  code: number
  data: {
    subscription_id: number
    status: string
    value: number
    custom_id: string | null
    notification_url: string | null
    payment_method: string
    next_execution: string
    next_expire_at: string
    plan: {
      plan_id: number
      name: string
      interval: number
      repeats: number | null
    }
    customer: { email: string; phone_number: string }
    occurrences: number
    created_at: string
  }
}>

/**
 * *PUT /v1/subscription/:id/cancel*
 *
 * *Params*
 */
export type CancelSubscriptionParams = { id: number }

/**
 * *PUT /v1/subscription/:id/cancel*
 *
 * *Body*
 */
export type CancelSubscriptionBody = {}

/**
 * *PUT /v1/subscription/:id/cancel*
 *
 * *Response*
 */
export type CancelSubscriptionResponse = { code: number }

/**
 * *POST /v1/subscription/:id/history*
 *
 * *Params*
 */
export type CreateSubscriptionHistoryParams = { id: number }

/**
 * *POST /v1/subscription/:id/history*
 *
 * *Body*
 */
export type CreateSubscriptionHistoryBody = { description: string }

/**
 * *POST /v1/subscription/:id/history*
 *
 * *Response*
 */
export type CreateSubscriptionHistoryResponse = { code: number }

/* -------------------------------------------------------------------------- */
/*                      SUBSCRIÇÃO – Reenviar Link                            */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/charge/:id/subscription/resend*
 *
 * *Params*
 */
export type SendSubscriptionLinkEmailParams = { id: number }

/**
 * *POST /v1/charge/:id/subscription/resend*
 *
 * *Body*
 */
export type SendSubscriptionLinkEmailBody = { email: string }

/**
 * *POST /v1/charge/:id/subscription/resend*
 *
 * *Response*
 */
export type SendSubscriptionLinkEmailResponse = { code: number }

/* -------------------------------------------------------------------------- */
/*                               LINK – One‑Step                              */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/charge/one-step/link*
 *
 * *Params*
 */
export type CreateOneStepLinkParams = {}

/**
 * *POST /v1/charge/one-step/link*
 *
 * *Body*
 */
export type CreateOneStepLinkBody = {
  items: Array<{
    name: string
    value: number
    amount: number
    marketplace?: { payee_code?: string; percentage?: number }
  }>
  shippings?: Array<{
    name: string
    value: number
    payee_code?: string
  }>
  metadata?: { custom_id?: string; notification_url?: string }
  customer?: { email: string }
  settings: {
    billet_discount?: number
    card_discount?: number
    conditional_discount?: {
      type: 'percentage' | 'currency'
      value: number
      until_date: string
    }
    message?: string
    expire_at: string
    request_delivery_address: boolean
    payment_method: 'banking_billet' | 'credit_card' | 'all'
  }
}

/**
 * *POST /v1/charge/one-step/link*
 *
 * *Response*
 */
export type CreateOneStepLinkResponse = Promise<{
  code: number
  data: {
    charge_id: number
    status: string
    total: number
    custom_id: string | null
    payment_url: string
    payment_method: string
    billet_discount: number | null
    card_discount: number | null
    conditional_discount_value: number | null
    conditional_discount_type: string | null
    conditional_discount_date: string | null
    request_delivery_address: boolean
    message: string | null
    expire_at: string
    created_at: string
  }
}>

/* -------------------------------------------------------------------------- */
/*                               LINK – Cobrança                              */
/* -------------------------------------------------------------------------- */

/**
 * *POST /v1/charge/:id/link*
 *
 * *Params*
 */
export type DefineLinkPayMethodParams = { id: number }

/**
 * *POST /v1/charge/:id/link*
 *
 * *Body*
 */
export type DefineLinkPayMethodBody = {
  billet_discount?: number
  card_discount?: number
  conditional_discount?: {
    type: 'percentage' | 'currency'
    value: number
    until_date: string
  }
  message?: string
  expire_at: string
  request_delivery_address: boolean
  payment_method: 'banking_billet' | 'credit_card' | 'all'
}

/**
 * *POST /v1/charge/:id/link*
 *
 * *Response*
 */
export type DefineLinkPayMethodResponse = Promise<{
  code: number
  data: {
    charge_id: number
    status: string
    total: number
    custom_id: string | null
    payment_url: string
    payment_method: string
    conditional_discount_date: string | null
    conditional_discount_value?: number
    conditional_discount_type?: 'percentage' | 'currency'
    billet_discount?: number
    card_discount?: number
    created_at: string
  }
}>

/**
 * *PUT /v1/charge/:id/link*
 *
 * *Params*
 */
export type UpdateChargeLinkParams = { id: number }

/**
 * *PUT /v1/charge/:id/link*
 *
 * *Body*
 */
export type UpdateChargeLinkBody = {
  billet_discount?: number
  card_discount?: number
  conditional_discount?: {
    type: 'percentage' | 'currency'
    value: number
    until_date: string
  }
  message?: string
  expire_at: string
  request_delivery_address: boolean
  payment_method: 'banking_billet' | 'credit_card' | 'all'
}

/**
 * *PUT /v1/charge/:id/link*
 *
 * *Response*
 */
export type UpdateChargeLinkResponse = Promise<{
  code: number
  data: {
    charge_id: number
    status: string
    total: number
    custom_id: string | null
    payment_url: string
    payment_method: string
    conditional_discount_date: string | null
    conditional_discount_value?: number
    conditional_discount_type?: 'percentage' | 'currency'
    billet_discount?: number
    card_discount?: number
    created_at: string
  }
}>

/**
 * *POST /v1/charge/:id/link/resend*
 *
 * *Params*
 */
export type SendLinkEmailParams = { id: number }

/**
 * *POST /v1/charge/:id/link/resend*
 *
 * *Body*
 */
export type SendLinkEmailBody = { email: string }

/**
 * *POST /v1/charge/:id/link/resend*
 *
 * *Response*
 */
export type SendLinkEmailResponse = { code: number }

/* -------------------------------------------------------------------------- */
/*                               NOTIFICAÇÕES                                 */
/* -------------------------------------------------------------------------- */

/**
 * *GET /v1/notification/:token*
 *
 * *Params*
 */
export type GetNotificationParams = { token: string }

/**
 * *GET /v1/notification/:token*
 *
 * *Body*
 */
export type GetNotificationBody = {}

/**
 * *GET /v1/notification/:token*
 *
 * *Response*
 */
export type GetNotificationResponse = Promise<{
  code: number
  data: Array<{
    created_at: string
    custom_id: string | null
    id: number
    identifiers: {
      charge_id?: number
      subscription_id?: number
      carnet_id?: number
    }
    status: {
      current: string
      previous: string | null
    }
    type: string
    value?: number
    received_by_bank_at?: string
  }>
}>

