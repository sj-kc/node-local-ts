export interface Account {
  accountName: string
  accountNumber: string
  amount: number
  creditCardNumber: string
  internalId: string
}

export interface AccountQuery {
  page: string
  pagesize: string
}

export interface AccountRequest {
  accountName: string
  amount: number
}
