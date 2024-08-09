export class Exception extends Error {
  public status?: number;
  public statusText?: string;

  constructor(message: string, status?: number, statusText?: string) {
    super();
    this.status = status;
    this.statusText = statusText;
    this.message = message;
  }
}
