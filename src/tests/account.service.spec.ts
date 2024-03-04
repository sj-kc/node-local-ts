import DBHandler from '../db/db.handler'
import { createAccountModel } from '../account/account.service'
import { AccountRequest } from '../account/account.types'

const dbHandler = new DBHandler()

beforeAll(async () => await dbHandler.connectDB())

afterAll(async () => await dbHandler.closeDB())

describe('Create account', () => {
  test('should return created account', async () => {
    const account: AccountRequest = await createAccountModel({
      accountName: 'test',
      amount: 100,
    })

    expect(account).toEqual(account)
  })
})
