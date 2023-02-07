export class HttpError extends Error {
  constructor(public message: string, public response: Response) {
    super()
  }
}
