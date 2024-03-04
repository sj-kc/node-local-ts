import asyncHandler from 'express-async-handler'
import { Router, Request, Response } from 'express'
import { Controller } from '../interfaces'
import { AccountQuery, AccountRequest } from './account.types'
import { getAccountsModel, createAccountModel } from './account.service'
import { HttpException } from '../exceptions/httpExceptions'

class AccountController implements Controller {
  path = '/accounts'
  route = Router()

  constructor() {
    this.route
      .get(this.path, asyncHandler(this.getAccounts))
      .post(this.path, asyncHandler(this.createAccount))
  }

  async getAccounts(req: Request<{}, {}, {}, AccountQuery>, res: Response) {
    const accounts = await getAccountsModel(req.query)

    if (accounts.length === 0) {
      throw new HttpException('Not Found', 404)
    }

    res.json(accounts)
  }

  async createAccount(req: Request<{}, {}, AccountRequest>, res: Response) {
    const { accountName, amount } = req.body

    if (!accountName || !amount) {
      throw new HttpException('Bad request', 400)
    }

    if (accountName.trim().length === 0) {
      throw new HttpException('Bad request', 400)
    }

    const account = await createAccountModel(req.body)

    res.json(account)
  }
}

export default AccountController
