export class Response {
  status: number | undefined;
  statusText: string | undefined;
  data?: unknown;

  constructor(status: number | undefined, statusText: string | undefined, data?: unknown) {
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}
