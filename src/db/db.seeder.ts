import { faker } from '@faker-js/faker'
import { AccountModel } from '../account/account.model'
import { Account } from '../account/account.types'

class DBSeeder {
  public async accountSeeder(): Promise<void> {
    try {
      await AccountModel.deleteMany()

      const accounts: Account[] = []

      for (let i = 0; i < 40; i++) {
        accounts.push({
          accountName: faker.finance.accountName(),
          accountNumber: faker.finance.account(),
          amount: faker.datatype.number({ min: 1, max: 1000 }),
          creditCardNumber: faker.finance.creditCardNumber(),
          internalId: faker.datatype.uuid(),
        })
      }

      await AccountModel.insertMany(accounts)
      console.log('DB seeded!')
    } catch (error) {
      console.log(error)
    }
  }
}

export default DBSeeder
