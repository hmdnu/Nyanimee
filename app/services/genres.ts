import { AnimeStructure } from "~/structs/AnimeStruct";
import { Response } from "~/utils";

export class Genres extends AnimeStructure<string> {
  protected extractHTML(html: string): string {
    return html;
  }

  async get(param: string): Promise<Response> {
    return new Response(200, "ok", param);
  }
}
