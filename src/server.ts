import App from './app'
import AccountController from './account/account.controller'

const app = new App([new AccountController()])
app.listen()
