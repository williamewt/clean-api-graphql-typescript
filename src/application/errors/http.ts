export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server Failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class NotUpdateError extends Error {
  constructor (name: string) {
    super(`${name} not updated`)
    this.name = 'ServerError'
  }
}

export class NotFindError extends Error {
  constructor (name: string) {
    super(`${name} not find`)
    this.name = 'ServerError'
  }
}
