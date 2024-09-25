import * as cheerio from "cheerio";
import { TDownloadAnimeUrl, TDownloadProvider } from "~/types";
import { Env } from "~/utils/env";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { gofetch, Response } from "~/utils";

export class DownloadAnime extends AnimeStructure<TDownloadAnimeUrl> {
  protected extractHTML(html: string, type: string): TDownloadAnimeUrl {
    const downloadUrl: TDownloadAnimeUrl = { title: "", downloadUrl: [] };

    const $ = cheerio.load(html);

    const title = $(`${type === "episode" ? ".download" : ".batchlink"} h4`).text();

    // get anime download infos
    $(`${type === "episode" ? ".download" : ".batchlink"} ul li`).each((_, e) => {
      const resolution = $(e).find("strong").text();
      const size = $(e).find("i").text();

      const providers: TDownloadProvider[] = [];

      $(e)
        .find("a")
        .each((_, e) => {
          const provider = $(e).text();
          const href = $(e).attr("href") || "";
          providers.push({ provider, href });
        });

      downloadUrl.downloadUrl.push({ resolution, providers: providers, size });
    });

    // populate title & stream url
    downloadUrl.title = title;

    return downloadUrl;
  }

  async get(animeEpisode: string, type: string): Promise<Response<TDownloadAnimeUrl>> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, `/${type}/${animeEpisode}`);

    const anime = this.extractHTML(String(page?.data), type);

    return new Response(200, "ok", anime);
  }
}
