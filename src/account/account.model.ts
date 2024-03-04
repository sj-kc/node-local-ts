import { Schema, model } from 'mongoose'
import { Account } from './account.types'

const AccountSchema = new Schema(
  {
    accountName: String,
    accountNumber: Number,
    amount: Number,
    creditCardNumber: String,
    internalId: String,
  },
  { versionKey: false },
)

export const AccountModel = model<Account>('Account', AccountSchema)
