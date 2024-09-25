export class Response<T> {
  status: number | undefined;
  statusText: string | undefined;
  data?: T;

  constructor(status: number | undefined, statusText: string | undefined, data?: T) {
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}
