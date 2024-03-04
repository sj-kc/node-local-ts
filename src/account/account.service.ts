import { faker } from '@faker-js/faker'
import { AccountModel } from './account.model'
import { AccountQuery, AccountRequest, Account } from './account.types'

export async function getAccountsModel(
  params: AccountQuery,
): Promise<Account[]> {
  const pageNumber = Number(params?.page) || 1
  const pageSize = Number(params?.pagesize) || 0

  const skip = (pageNumber - 1) * pageSize

  return await AccountModel.find({}, null, {
    skip,
    limit: pageSize,
  })
}

export async function createAccountModel(
  params: AccountRequest,
): Promise<Account> {
  const account = {
    ...params,
    accountNumber: faker.finance.account(),
    creditCardNumber: faker.finance.creditCardNumber(),
    internalId: faker.datatype.uuid(),
  }

  return await AccountModel.create(account)
}
