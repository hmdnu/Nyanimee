import { Response } from "~/utils";

export abstract class AnimeStructure<T> {
  protected abstract extractHTML(html: string, opt?: string): T | Promise<T>;
  abstract get(param: string, opt?: string): Promise<Response<T>>;
}
