import * as cheerio from "cheerio";
import { Env } from "~/utils/env";
import { TDetailAnime, TJikanAnime } from "~/types";
import { AnimeStructure } from "~/structs/AnimeStruct";
import { gofetch, Response } from "~/utils";

export class DetailAnime extends AnimeStructure<TDetailAnime> {
  protected async extractHTML(html: string): Promise<TDetailAnime> {
    const $ = cheerio.load(html);

    const detailAnime: TDetailAnime = {
      title: "",
      score: 0,
      type: "",
      status: "",
      totalEpisode: 0,
      duration: "",
      aired: "",
      studio: "",
      genres: [],
      trailerUrl: "",
      synopsis: "",
      rating: "",
      coverImg: "",
      episodes: [],
    };

    // remove unnecesary element
    $(".episodelist:last").remove();

    // populate episodes
    $(".episodelist ul li").each((_, e) => {
      const episode = $(e).find("a").text();
      const date = $(e).find(".zeebr").text();
      const href = $(e).find("a").attr("href") || "";

      detailAnime.episodes.push({ episode, date, href });
    });

    // get title and remove value after title
    const rawTitle = $(".episodelist ul li").find("a").last().text();
    const splittedTitle = rawTitle.split(" ");

    for (let i = splittedTitle.indexOf("Episode"); i < splittedTitle.length; i++) {
      splittedTitle.splice(i);
    }
    const title = splittedTitle.join(" ");

    // get details
    const res = await gofetch({ baseUrl: Env.jikanUrl }, `/anime?q=${title}&limit=1`);
    const details = (res?.data as { data: TJikanAnime[] }).data[0];

    console.log(res);

    // populate instances
    detailAnime.title = title;
    detailAnime.score = details.score;
    detailAnime.studio = details.studios[0].name;
    detailAnime.status = details.status;
    detailAnime.type = details.type;
    detailAnime.synopsis = details.synopsis;
    details.genres.map((genre) => detailAnime.genres.push({ name: genre.name }));
    detailAnime.totalEpisode = details.episodes;
    detailAnime.duration = details.duration;
    detailAnime.aired = details.aired.string;
    detailAnime.rating = details.rating;
    detailAnime.trailerUrl = details.trailer.embed_url;
    detailAnime.coverImg = details.images.jpg.large_image_url;

    return detailAnime;
  }

  async get(animeTitle: string): Promise<Response> {
    const page = await gofetch({ baseUrl: Env.baseUrl }, `/anime/${animeTitle}`);

    if (!page || page.status !== 200) {
      throw new Response(page?.status, page?.statusText);
    }

    const animes = await this.extractHTML(String(page.data));

    return new Response(200, "ok", animes);
  }
}
