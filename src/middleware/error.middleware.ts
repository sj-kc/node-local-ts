import { Request, Response, NextFunction } from 'express'
import { HttpException } from '../exceptions/httpExceptions'

function errorMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('error in middleware')

  const errorMessage = err?.message || 'Something went wrong'
  const statusCode = err?.status || 500

  res.status(statusCode).json({
    message: errorMessage,
    status: statusCode,
  })
}

export default errorMiddleware
