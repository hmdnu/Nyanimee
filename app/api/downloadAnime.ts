import * as cheerio from "cheerio";
import axios from "axios";
import { TDownloadAnimeUrl, TDownloadProvider } from "~/types";
import { Env } from "~/utils/env";

export async function getAnimeDownloadUrl(animeEpisode: string | undefined) {
  try {
    const page = await axios.get(`${Env.baseUrl}/episode/${animeEpisode}`);

    const downloadUrl: TDownloadAnimeUrl = { title: "", downloadUrl: [] };

    if (!page) return downloadUrl;

    const $ = cheerio.load(page.data);

    const title = $(".posttl").text();

    // get anime download infos
    $(".download ul li").each((_, e) => {
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

      downloadUrl.downloadUrl.push({ resolution, provider: providers, size });
    });

    // populate title
    downloadUrl.title = title;

    return downloadUrl;
  } catch (error) {
    console.log(error);
    return error;
  }
}
