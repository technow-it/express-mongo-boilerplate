export class DomainError extends Error {
  httpStatus!: number
  internalCode!: number
  systemMessage?: string
  clientMessage?: string

  constructor(message: string, httpStatus: number, internalCode: number, systemMessage?: string, clientMessage?: string) {
    super(message)
    this.name = this.constructor.name
    this.httpStatus = httpStatus
    this.internalCode = internalCode
    this.systemMessage = systemMessage
    this.clientMessage = clientMessage
    Error.captureStackTrace(this, this.constructor)
  }
}
